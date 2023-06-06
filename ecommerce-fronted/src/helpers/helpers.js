import toast from "react-hot-toast";

export const signOut = (props) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userid");
  localStorage.removeItem("productCompareId");
  // localStorage.removeItem("compareItems");
  localStorage.removeItem("myObject");
  props.history.push("/");
};

export const isLogin = () => {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
};

export function tryParseJSONObject(jsonString) {
  try {
    const o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return o;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

export const addProductIdForCompare = (id) => {
  let productCompareIdArray =
    tryParseJSONObject(localStorage.getItem("productCompareId")) || [];

  if (!productCompareIdArray?.includes(id)) {
    productCompareIdArray.push(id);
    localStorage.setItem(
      "productCompareId",
      JSON.stringify(productCompareIdArray)
    );
    toast.success("Product Added To Compare.");
  }
};

export const postal = new RegExp(
  /^\s*[a-ceghj-npr-tvxy]\d[a-ceghj-npr-tv-z](\s)?\d[a-ceghj-npr-tv-z]\d\s*$/i
);

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const makeShortText = (text) => {
  if (text.length > 10) {
    return text.substring(0, 10) + "...";
  }
  return text;
};
