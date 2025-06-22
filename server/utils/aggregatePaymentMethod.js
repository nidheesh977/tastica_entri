export const paymentMethods = (methods) => {

            let method;
            let fieldName;
    
            if(methods === "cash"){
            fieldName = "paymentMethod"
            method =  "cash"
            }else if(methods === "digital"){
            fieldName = "paymentMethod"
            method =  "digital"
            }else if(methods === "internal-device"){
            fieldName = "paymentMethod"
            method =  "internal-device"
            }else{
            fieldName = "paymentStatus"
            method =  "success"
            }

          return {method:method,fieldName:fieldName}
}