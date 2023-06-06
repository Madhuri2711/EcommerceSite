import axios from 'axios';
import moment from 'moment';
import { ORDER_STATUS } from '../common/constant.js';
import CANADA_POST from '../config/delivery.config.js';
import OrderModel from '../models/orders.js';
import { xmlToJson } from '../utility/helpers.js';

const orderTracking = async () => {
    try {
        const orderDetails = await OrderModel.find({
            is_delivered: false,
            shipping_tracking_id: { $ne: null }
        });
        console.log('orderDetails', orderDetails);
        for (let i = 0; i < orderDetails.length; i++) {

            const order = orderDetails[i];

            if (order?.shipping_tracking_id) {
                var config = {
                    method: 'GET',
                    url: `${CANADA_POST.HOST}/vis/track/pin/${order?.shipping_tracking_id}/details`,
                    headers: {
                        'Authorization': CANADA_POST.TOKEN,
                        'Accept': 'application/vnd.cpc.track-v2+xml',
                        'Accept-language': 'en-CA',
                    }
                };

                const result = await axios(config);
                console.log('result?.data', result?.data);
                if (result?.data) {
                    const obj = await xmlToJson(result?.data);
                    const tracking_details = obj['tracking-detail'];
                    const expected_delivery_date = tracking_details['expected-delivery-date'][0];
                    const significant_event = tracking_details['significant-events'][0];
                    const tracking_arr = significant_event['occurrence'];

                    const tracking_detail_arr = [];
                    tracking_arr.forEach((track) => {
                        const newTrack = {
                            date: track['event-date'][0],
                            time: track['event-time'][0],
                            time_zone: track['event-time-zone'][0],
                            description: track['event-description'][0],
                        }
                        tracking_detail_arr.push(newTrack);
                    });

                    let is_delivered = false;
                    let delivered_date = null;
                    if (tracking_detail_arr.length > 0) {
                        is_delivered = tracking_detail_arr[0].description.includes('Delivered');
                        if (is_delivered || tracking_detail_arr[0].description.includes('delivered')) {
                            const date = moment().format('YYYY-MM-DD');
                            delivered_date = date + 'T00:00:00.000Z';
                        }
                    }

                    await OrderModel.findByIdAndUpdate(
                        order._id,
                        {
                            shipping_tracking: tracking_detail_arr,
                            expected_delivery_date,
                            is_delivered,
                            status: is_delivered ? ORDER_STATUS.DELIVERED : ORDER_STATUS.DELIVERY,
                            delivered_date
                        },
                        { new: true }
                    );
                }
                else {
                    console.log(`${CANADA_POST.HOST}/vis/track/pin/${order?.shipping_tracking_id}/details`)
                    console.log(`${result} is undefined`)
                }
            }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export default orderTracking;
