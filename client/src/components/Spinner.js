import { useId } from "react";
import "./Spinner.css";
function Spinner(props) {
  const id = useId();
  console.log("🚀 ~ id SPINNER:", id);

  return <div class="lds-dual-ring"></div>;
}
export default Spinner;
