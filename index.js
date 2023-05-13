const button = document.getElementById("btn");

const category_container = document.getElementById("categoryList");


const product_Items = document.querySelector(".productItems");


const products = document.querySelector(".products");
 products.style.display="none";

const tbody =document.getElementsByTagName("tbody");

const tableList = document.querySelectorAll(".tableList");
tableList[0].style.display="none";
tableList[1].style.display="none";

  
function renderTable1(data){

    
     tableList[0].style.display = 'flex';
    data.posts.forEach((ele)=>{
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
          td1.innerText = ele.id;
        const td2 = document.createElement('td');
        td2.innerText = ele.title;
        const td3 = document.createElement('td');
        td3.innerText = ele.body;
        const td4 = document.createElement('td');
        td4.innerText = ele.userId;
        const td5 = document.createElement('td');
        td5.innerText = ele.tags;
        const td6 = document.createElement('td');
        td6.innerText = ele.reactions;
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        tbody[0].appendChild(tr);
    })
}
 



async function fetchProductCategories(data){

     products.style.display="grid";

   

    

    let categories = [];
    for(let i = 0;i<data.products.length;i++){
        if(!categories.includes(data.products[i].category))
        categories.push(data.products[i].category);
    }
   
    rendercategories(categories);

}


function rendercategories(categoryList){

    let category_items = categoryList.map(element => {
        const div = document.createElement("div");

        div.className = "type";
        div.innerText = element;
        div.classList
        category_container.appendChild(div);
        return div;
    });

   

    // category_items[0].classList.add( "change-background");
    changeBg(category_items,category_items[0]);
     category_items.forEach((div,index)=>{
        div.addEventListener("click",()=>{
            changeBg(category_items,div);
        })
     })

}

async function changeBg(cate_list,element){
    cate_list.forEach((ele)=>{
        ele.classList.remove("change-background")
    })
    element.classList.add("change-background");

    const url = "https://dummyjson.com/products";

    const response = await fetch(url);

    const data = await response.json();

    let itemslist =[];
    for(let i = 0;i<data.products.length;i++){
        if(data.products[i].category === element.innerText)
        itemslist.push(data.products[i]);
    }
    renderProductItems(itemslist);
}

function renderProductItems(itemslist){
     product_Items.innerHTML ="";
    itemslist.forEach(div=>{
       const item_container = document.createElement("div");
       item_container.className = "category_items";
      
       const image = document.createElement("div");
       image.className = "image";
       const img = document.createElement("img");
       img.src= div.thumbnail;
       const brand =document.createElement("span");
       brand.className = "brand";
       brand.innerText = div.brand;
       image.appendChild(img);
       image.appendChild(brand);

       const about = document.createElement("div");
       about.className = "about";

       const title = document.createElement("div");
       title.innerText = "Title: "+div.title;
       const price = document.createElement("div");
       price.innerText = "price: "+div.price;

       about.appendChild(title);
       about.appendChild(price);

       const product = document.createElement("div");
       product.className = "product";
       
       const discount = document.createElement("div");
       discount.innerText = "Discount:"+div.discountPercentage+"%";

       const stock = document.createElement('div');
       stock.innerText = "stock"+div.stock;

       const rating = document.createElement("div");
       rating.innerText = "rating:"+rating;

       product.appendChild(discount);
       product.appendChild(stock);
       product.appendChild(rating);

       const description = document.createElement("div");
       description.className ="description"
       description.innerText = div.description;

       item_container.appendChild(image);
       item_container.appendChild(about);
       item_container.appendChild(product);
       item_container.appendChild(description);

       product_Items.appendChild(item_container);
    })
}

async function renderTable2(data){

    tableList[1].style.display = 'flex';
    data.todos.forEach((ele)=>{
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
          td1.innerText = ele.id;
        const td2 = document.createElement('td');
        td2.innerText = ele.todo;
        const td3 = document.createElement('td');
        td3.innerText = ele.completed;
        const td4 = document.createElement('td');
        td4.innerText = ele.userId;
       
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        
        tbody[1].appendChild(tr);
    })
}

 function promiseAPI1(){
    return new Promise((resolve,reject)=>{
         setTimeout(()=>{
            fetch("https://dummyjson.com/posts").then(response => response.json())
            .then(data => {
                renderTable1(data);
                resolve(true);
            })
           
         },1000)
    })
}



function promiseAPI2(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
       fetch("https://dummyjson.com/products").then(response=>response.json())
       .then(data=>{
        fetchProductCategories(data);
        resolve(true);
       })
        
      },2000)
    })
}

function promiseAPI3(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            fetch("https://dummyjson.com/todos").then(response=>response.json())
            .then(data =>{
                renderTable2(data);
                resolve(true);
            })
           
        },3000)
    })
}



button.addEventListener("click",()=>{
    promiseAPI1().then(promiseAPI2).then(promiseAPI3).catch(console.error(error));
}) 