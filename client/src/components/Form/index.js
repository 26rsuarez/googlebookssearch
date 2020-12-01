import React from "react";

// This file exports the Input

export function Input(props) {
  return (
    <div className="form-group" style={{marginTop: 20, marginLeft: 20}}>
      <input className="form-control" {...props} />
    </div>
  );
}

// export function TextArea(props) {
//   return (
//     <div className="form-group">
//       <textarea className="form-control" rows="20" {...props} />
//     </div>
//   );
// }

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 20, marginTop: 20 }} className="btn btn-success">
      {props.children}
    </button>
  );
}
