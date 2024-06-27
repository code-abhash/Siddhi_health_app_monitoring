// // ForgotPassword.jsx
// import React, { useState } from "react";
// import Swal from "sweetalert2";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/password-reset/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email })
//       });

//       const data = await response.json();

//       if (response.status === 200) {
//         Swal.fire({
//           title: "Email Sent",
//           text: "Check your inbox for the password reset link",
//           icon: "success",
//           toast: true,
//           timer: 3000,
//           position: 'top-right',
//           timerProgressBar: true,
//           showConfirmButton: false,
//         });
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: error.message,
//         icon: "error",
//         toast: true,
//         timer: 3000,
//         position: 'top-right',
//         timerProgressBar: true,
//         showConfirmButton: false,
//       });
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleForgotPassword}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/forgot-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });


      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      Swal.fire({
        title: "Email Sent",
        text: "Check your inbox for the password reset link",
        icon: "success",
        toast: true,
        timer: 3000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        toast: true,
        timer: 3000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;