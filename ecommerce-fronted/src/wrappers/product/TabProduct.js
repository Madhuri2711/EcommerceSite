import PropTypes from 'prop-types'
import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import SectionTitle from '../../components/section-title/SectionTitle'
import ProductGrid from './ProductGrid'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const TabProduct = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  category,
}) => {
  
  const { products, status } = useSelector((state) => state.products);

  return (
    <>
      <div
        className={`product-area ${spaceTopClass ? spaceTopClass : ''} ${
          spaceBottomClass ? spaceBottomClass : ''
        } ${bgColorClass ? bgColorClass : ''}`}
      >
        <div className="container">
          <SectionTitle
            titleText="TRENDING COLLECTIONS"
            positionClass="text-center mb-4"
          />
          <Tab.Container defaultActiveKey="newArrival">
            {/* <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>New Arrivals</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>Best Sellers</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>Sale Items</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav> */}
            <Tab.Content>
              <Tab.Pane eventKey="newArrival">
                <div className="row">
                  <ProductGrid
                    category={category}
                    type="new"
                    // limit={8}
                    spaceBottomClass="mb-25"
                  />
                </div>
                <div className="blog-header-btn blog-desktop-btn d-flex justify-content-center">
                  <Link to="/products">View More <i class="fa fa-arrow-right" style={{marginLeft:'10px'}}></i></Link>
                </div>
              </Tab.Pane>
              {/* <Tab.Pane eventKey="bestSeller">
              <div className="row">
                <ProductGrid
                  category={category}
                  type="bestSeller"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane> */}
              {/* <Tab.Pane eventKey="saleItems">
              <div className="row">
                <ProductGrid
                  category={category}
                  type="saleItems"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane> */}
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </>
  )
}

TabProduct.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
}

export default TabProduct
