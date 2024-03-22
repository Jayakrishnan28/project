var productsList = [[10001,"Rice",153],[10002,"Oil",187],[10003,"Dal",120],[10004,"Sugar",70],[10005,"Coffee",152.4]];
var tempProdDB = [];
var productId = "";
var productName = "";
var productPrice = "";
var productCount = "";
var productTotal = "";
var index = -1;
function getInputs() {
     productId = Number(document.getElementById('pId').value);
     productName = document.getElementById('pName').value;
     productPrice = Number(document.getElementById('pPrice').value);
     productCount =  Number(document.getElementById('pCount').value);
     productTotal =  Number(document.getElementById('pTotal').value);  
     document.getElementById('grandTotal');    
     document.getElementById('discount');   
     document.getElementById('discountTotal');     
}
function addProducts(){
    getInputs();
    let products = [productId, productName, productPrice, productCount, productTotal];
    tempProdDB.push(products);
    displayProducts();
    resetAllData();
    //console.log(tempProdDB);
}
function displayProducts(){
    let res="";
  //  console.log(tempProdDB);
    for(let productIdx=0; productIdx < tempProdDB.length; productIdx++){
        let products = tempProdDB[productIdx];
        res+= '<div class="row mt-4">'+
                '<div class="col">'+products[0]+'</div>'+
                '<div class="col">'+products[1]+'</div>'+
                '<div class="col">'+products[2]+'</div>'+
                '<div class="col">'+products[3]+'</div>'+
                '<div class="col">'+products[4]+'</div>'+
                '<div class="col">'+
                    '<button class="btn btn-warning" onclick="updateProducts('+productIdx+')">Update</button>'+'&nbsp'+
                    '<button class="btn btn-danger"onclick="deleteProducts('+productIdx+')">Delete</button>'+
                '</div>'+
            '</div>';
    }
        document.getElementById('productListDisplay').innerHTML = res;
        findGrandTotal();
}
function populatedPrice(){
    getInputs();
    let selectedProduct = productsList.filter(productList =>{return productList[0] === productId});
    //console.log(selectedProduct);
    selectedProduct = selectedProduct.flat(1);
    //console.log(selectedProduct);
    if(selectedProduct.length>0){
        document.getElementById('pName').value = selectedProduct[1];
        document.getElementById('pPrice').value = selectedProduct[2];
        findTotal();
    }
    else{
        resetData();
    }
}
function findTotal(){
    getInputs();
    let res = productPrice * productCount;
    document.getElementById('pTotal').value = res;
}
function findGrandTotal(){
    let result=0;
    for (let product of tempProdDB){
        result += product[4];     
    }
    grandTotal.innerHTML = result;
    findDiscount(result);
}
function findDiscount(grandSum){
    let dis = 0;
    if(grandSum>2000){
        dis = Math.ceil(((10*grandSum)/100));
        grandSum -= dis;
        discount.innerHTML = "10%";
        discountTotal.innerHTML = Math.ceil(grandSum);
        //console.log(grandSum);
    }
    else{
        discount.innerHTML = "0%";
        discountTotal.innerHTML = Math.ceil(grandSum);
    }
}
function resetData(){
    document.getElementById('pName').value = "";
    document.getElementById('pPrice').value = "";
    document.getElementById('pCount').value = "";
    document.getElementById('pTotal').value = "";
}
function resetAllData(){
    resetData();
    document.getElementById('pId').value = "--Select--";

}
function deleteProducts(idx){
    let toBeDeletedProduct = tempProdDB[idx];
    console.log(toBeDeletedProduct);
    console.log(tempProdDB);
    tempProdDB.splice(idx,1);
    console.log(tempProdDB);
    displayProducts();
}
function updateProducts(idx){
    let toBeUpdatedProduct = tempProdDB[idx];
    document.getElementById('pId').value = toBeUpdatedProduct[0];
    document.getElementById('pName').value = toBeUpdatedProduct[1];
    document.getElementById('pPrice').value = toBeUpdatedProduct[2];
    document.getElementById('pCount').value =toBeUpdatedProduct[3];
    document.getElementById('pTotal').value = toBeUpdatedProduct[4];
    deleteProducts(idx);
}