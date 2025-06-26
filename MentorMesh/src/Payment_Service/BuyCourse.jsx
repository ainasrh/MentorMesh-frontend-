import axios from "axios";
import API_BASE_URL from "../config";
const razorpay_key_id = import.meta.env.VITE_RAZORPAY_KEY_ID 
const razorpay_secret_key = import.meta.env.VITE_RAZORPAY_SECRET_KEY 

function BuyCourse({ userId, courseId, amount }) {

  
  
  
  
  const handleBuy = async () => {
    try {
      // 1. Create Order
      const res = await axios.post(`${API_BASE_URL}/payment/create-payment/`,{
        user_id: userId,
        course_id: courseId,
        amount: amount,
      });

      const { id: order_id, currency, amount: razorAmount } = res.data;

      // 2. Initialize Razorpay Checkout
      const options = {
        key: razorpay_key_id, 
        amount: razorAmount,
        currency: currency,
        name: "MentorMesh",
        description: "Course Purchase",
        order_id,
        handler: async function (response) {
          const verifyRes = await axios.post(`${API_BASE_URL}/verify-payment/`, {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });

          if (verifyRes.status === 200) {
            alert(" Payment successful and verified!");
          } else {
            alert(" Payment verification failed");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error", err);
      alert("Payment failed");
    }
  };

   return (
    <button
      onClick={handleBuy}
      className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      🛒 Buy Now
    </button>
  );
}

export default BuyCourse;
