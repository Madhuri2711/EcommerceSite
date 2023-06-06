import React, { Fragment, useRef, useEffect } from "react";
import _ from "lodash";
import "./CreditCard.scss";

export const CreditCard = ({ values, handleTransition }) => {
  const cardInner = useRef();
  const numberItem = useRef();
  const { card_number, card_holder_name, exp_month, exp_year, cvc } = values;

  useEffect(() => {
    handleTransition(cardInner, numberItem);
  }, [handleTransition]);

  const trimmedCardNumber = [...card_number].filter((d) => d !== " ");
  const newArray = new Array(16 - trimmedCardNumber.length).fill("#");
  const cardNumero = _.chunk([...trimmedCardNumber, ...newArray], 4);

  return (
    <div className="card">
      <div className="cardInner" ref={cardInner}>
        <div className="cardFront">
          <div className="row">
            <div className="chip">
              <img
                src="https://as1.ftcdn.net/jpg/01/22/06/72/500_F_122067245_li2zr9npi1aZZ6dto4SNgxAFKt302X7d.jpg"
                alt="chip"
              />
            </div>{" "}
            <div className="cardType">VISA</div>{" "}
          </div>
          <span className="cardNumber">
            {[...cardNumero].map((n, index) => (
              <Fragment>
                {n.map((s, i) => (
                  <div key={s + i} className="numberItem" ref={numberItem}>
                    {s.trim()}
                  </div>
                ))}
                <div key={n + index} className="numberSeparator" />
              </Fragment>
            ))}
          </span>

          <div className="row">
            {" "}
            <div className="cardHolder">{card_holder_name || "FULL NAME"} </div>
            <div>
              <span>{exp_month || "MM"}</span>/<span>{exp_year || "YY"}</span>
            </div>
          </div>
        </div>
        <div className="cardBack">
          <div className="band" />ssss
          <div className="cvv">
            <div className="cvvLabel">CVV</div>
            <div className="cvvField">{cvc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;