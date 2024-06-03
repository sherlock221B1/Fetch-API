  let products;
  const resource = "https://fakestoreapi.com/products"
  fetch(resource)
  .then((response)=>{
    const responseData = response.json(); 
    return responseData;
  })
  .then((productsDataFromSever)=>{
    products = productsDataFromSever
    console.log(products)
    // အောက်က ကောင်တွေက ဒီကောင်တွေကို မစောင့်ဘဲ run မှာဖြစ်တဲ့ အတွက် data ယူတာကြာနေရင် ပြဿနာဖြစ်မယ်။ အဲ့တာကိုရှောင်ဖို့လုပ်ရမယ်။
    // buildUI(); အောက်ကကောင်တွေအကုန်ကို buildUI() ထဲထည့်ပြီး ဒါမျိုးရေးရင်ရပေမယ့်သူ့မှာလည့်းပြဿနာရှိသေးတယ်။ data မရောက်သေးခင်ရိုက်ထည့်လိုက်တဲ့ကောင်တွေကိုမပြပေးတော့ဘူး
    // searchBoxTag.style.display = "block" ဒါမျိုးရှေ့မှာ searchBoxTag ကို ဖျောက်ထားပြီး data ယူပြီးမှခေါ်လိုက်ရင် အဆင်ပြေတယ်။ဒီထက်ပိုသပ်ရပ်တာ အောက်ကနည်း။
    searchBoxTag.disabled = false;
    // ဒီကောင်က အကောင်းဆုံးပဲ။ ရှေ့မှာ  searboxTag ကို disable altribute‌ ပေးလိုက်တယ်။ ဒီမှာ data ယူပြီးကာကျမှ disabled false ပြန်လုပ်ပေးလိုက်တယ်။
  })
  .catch((err)=>{
    console.log(err)
  })

    const searchBoxTag = document.getElementsByClassName("searchBox")[0];
    const resultContainerTag = document.getElementsByClassName("resultContainer")[0];
    const enteredProductContainerTag = document.getElementById("enteredProductContainer");
    
    let indexToSelect = -1;
    
    let filteredProducts = [];
    searchBoxTag.addEventListener("keyup", ()=>{
        if( 
            filteredProducts.length>0 &&
            (
                event.key === "ArrowDown" || 
                event.key === "ArrowUp" ||
                event.key === "Enter"
            )
        ){
            navigateAndSelectedTheProduct(event.key);
            return;
        }
    
        resultContainerTag.innerHTML = ""; //စာလုံးအသစ်ရိုက်တိုင်းမူလရှိပြီးသားကောင်တွေကိုဖျက်ပြီး စာလုံးအသစ်နဲ့ကိုက်တဲ့ကောင်တွေပဲပြပေးမယ်။    
        
        removeEnteredProcuctContainerAndShowResultContainer(); 
    
        indexToSelect = -1;
       
        const searchText = searchBoxTag.value.toLowerCase();
        filteredProducts = products.filter(product=>{
            return product.title.toLowerCase().includes(searchText);
        })
    
        if( searchText.length === 0){
            return;
        } // အကုန်ဖျက်လိုက်ရင် ဘာမှမပြတော့ဘဲနေအောင်လို့။
    
        for( let i=0; i<filteredProducts.length; i++){
            const productName = filteredProducts[i].title;
            const productImage = filteredProducts[i].image;
    
            const productContainer = document.createElement("div");
            productContainer.classList.add("productContainer");
    
            const productNameTag = document.createElement("div");
            productNameTag.append(productName);
            productNameTag.classList.add("productName");
    
            const productImageTag = document.createElement("img");
            productImageTag.src = productImage;
            productImageTag.classList.add("productImage");
    
            productContainer.append(productNameTag,productImageTag);
            resultContainerTag.append(productContainer);
        }
    })
    const navigateAndSelectedTheProduct = (key)=>{
        if( key === "ArrowDown" ){
          removeEnteredProcuctContainerAndShowResultContainer();
    
            if( indexToSelect === filteredProducts.length-1){
                indexToSelect = -1;
                deselectTheProduct();
                return;
            }
    
            indexToSelect += 1;
    
            selectTheProduct();
    
            if(indexToSelect > 0){
               deselectTheProduct();
            }
        }else if(key === "ArrowUp"){
          removeEnteredProcuctContainerAndShowResultContainer();
    
            if( indexToSelect === -1 ){
                return;
            }
            if( indexToSelect === 0 ){
                deselectTheProduct();
                indexToSelect = -1;
                return;
            }
            indexToSelect -= 1;
            deselectTheProduct();
            selectTheProduct();
        }else {
          
          if( indexToSelect > -1){
            removeResultContainerAndShowEnteredProcuctContainer();
            enteredProductContainerTag.classList.add("enteredProductContainer")
          } //ဘာမှ select မလုပ်သေးခင်မှာ enter ခေါက်ရင် အလုပ်မလုပ်အောင် indexToSelect နဲ့ check
    
            /* 
                resultContainerTag ကို enteredResultContainer  class ပေးရန်.
                <h3 class="enteredProduct"> Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</h3>
                <img class="enteredImage" src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg">
                <div class="enteredFacts">
                    <span class="enteredPrice">price: 109.95,</span>
                    <span class="enteredRate">rate: 3.9</span> 
                    <span class="enteredCount">count: 120</span>
                </div>
    
            */
    
           const enteredProduct = filteredProducts[indexToSelect].title;
           const enteredImage = filteredProducts[indexToSelect].image;
           const enteredPrice = "Price : " + filteredProducts[indexToSelect].price;
           const enteredRate = "Rate : " + filteredProducts[indexToSelect].rating.rate;
           const enteredCount = "Count : " + filteredProducts[indexToSelect].rating.count;
           console.log ( enteredProduct, enteredImage, enteredPrice, enteredRate, enteredCount);
    
    
            const enteredProductTag = document.createElement("h5");
            enteredProductTag.append(enteredProduct);
            enteredProductTag.classList.add("enteredProduct");
    
            const enteredImageTag = document.createElement("img");
            enteredImageTag.src = enteredImage;
            enteredImageTag.classList.add("enteredImage");
    
            const enteredFactsTag = document.createElement("div");
            enteredFactsTag.classList.add("enteredFacts");
    
            const enteredPriceTag = document.createElement("span");
            enteredPriceTag.append(enteredPrice);
            enteredPriceTag.classList.add("enteredPrice");
    
            const enteredRateTag = document.createElement("span");
            enteredRateTag.append(enteredRate);
            enteredRateTag.classList.add("enteredRate");
    
            const enteredCountTag = document.createElement("span");
            enteredCountTag.append(enteredCount);
            enteredCountTag.classList.add("enteredCount");
    
            enteredFactsTag.append( enteredPriceTag, enteredRateTag, enteredCountTag);
    
            enteredProductContainerTag.append( enteredProductTag, enteredImageTag, enteredFactsTag );
        }
    }
    
    const selectTheProduct = ()=>{
        const productContainerToSelect = document.getElementsByClassName("productContainer")[indexToSelect];
            productContainerToSelect.style.backgroundColor = "rgb(95, 95, 242)";
            productContainerToSelect.firstChild.style.color = "white";
            productContainerToSelect.classList.add("selected");
    
    }
    
    const deselectTheProduct = ()=>{
        const productContainerToDeselect = document.getElementsByClassName("selected")[0];
        productContainerToDeselect.style.backgroundColor = "white";
        productContainerToDeselect.firstChild.style.color = "black"
        productContainerToDeselect.classList.remove("selected");
    }
    
    const removeEnteredProcuctContainerAndShowResultContainer = ()=>{
      resultContainerTag.classList.remove("removeTheDiv") 
      enteredProductContainerTag.classList.add("removeTheDiv") 
      enteredProductContainerTag.innerHTML = ""; /* စာလုံးအသစ်ရိုက်လိုက်ရင် enteredProductContainerTag ပျောက်သွားပြီး enter ထပ်ခေါက်မှအသစ်ပေါ်လာ
        အောင်လို့။ဒိလိုမလုပ်ရင် enter အသစ်ခေါက်ရင် အရင်ကောင်ရော အသစ်ရော နှစ်ခုလုံးပေါ်နေမယ်။    */
    }
    
    const removeResultContainerAndShowEnteredProcuctContainer = ()=>{
      resultContainerTag.classList.add("removeTheDiv");
      enteredProductContainerTag.classList.remove("removeTheDiv");
    }
