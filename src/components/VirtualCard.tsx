import {
  generateCardNumber,
  generateExpiryDate,
  maskCardNumber,
} from "../util/utility";
import "./VirtualCard.css";

type VirtualCardProps = {
  first_name: string;
  last_name: string;
};

const VirtualCard = ({ first_name, last_name }: VirtualCardProps) => {
  const name =
    `${first_name || ""} ${last_name || ""}`.trim() || "Cardholder Name";
  const cardNumber = generateCardNumber();
  const expiry = generateExpiryDate();

  return (
    <div className="virtual-card">
      <div className="vc-header">Virtual Credit Card</div>
      <div className="vc-number">{maskCardNumber(cardNumber)}</div>
      <div className="vc-footer">
        <span className="vc-name">{name}</span>
        <span className="vc-expiry">{expiry}</span>
      </div>
    </div>
  );
};

export default VirtualCard;
