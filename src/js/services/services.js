function addZero(num) {
   if (num >= 0 && num < 10) {
      return `0${num}`;
   } else {
      return num;
   }
}

const postData = async (url, data) => {
   const result = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-type': 'application/json'
      },
      body: data
   });
   return await result.json();
};

const getResources = async url => {
   const result = await fetch(url);
   if (!result.ok) {
      throw new Error(`Couldt fetch ${url}, status: ${result.status}`);
   }
   return await result.json();
};

export {addZero, postData, getResources};