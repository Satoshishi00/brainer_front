export default (theString) => {
   let array_tmp = theString.split(' ');
   const regex = /^https:\/\//g;
   let str_reconstruction = "";
   for (let i = 0; i < array_tmp.length; i++) {
       if (array_tmp[i].match(regex)) {
           console.log(array_tmp[i]);
           //array_tmp[i] = "<a href='" + array_tmp[i] + "'/>";
           array_tmp[i] = array_tmp[i].link(array_tmp[i])
       }
       str_reconstruction += array_tmp[i] + " ";
   }
   console.log("string", str_reconstruction)
   return str_reconstruction;
}