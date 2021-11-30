let BasketAdd = document.querySelectorAll(".btn")

let dropdownMenu = document.querySelector(".dropdown-menu")

let dropdown = document.querySelector(".dropBtn")

BasketAdd.forEach(btn => {
    btn.onclick = function (e) {
        e.preventDefault();
        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]))
        }
        let basket = JSON.parse(localStorage.getItem("basket"))
        let name = this.parentElement.children[0].innerHTML;
        let dataId = this.getAttribute("data-id")
        let price = this.nextElementSibling.innerHTML
        let img = this.parentElement.previousElementSibling.src;
        let product = {
            Id: dataId,
            name,
            price,
            img,
            count: 1,
        }
        let existedProduct = basket.find(p => p.Id == dataId)
        if (existedProduct == undefined) {
            basket.push(product)
        } else {
            existedProduct.count++
        }
        localStorage.setItem("basket", JSON.stringify(basket));
        let li = document.createElement("li")
        let p = document.createElement("p")
        let image = document.createElement("img")
        image.style.width = "65px"
        image.src = img
        li.innerHTML = "Name:" + name + "  " + "<br>" + "Price:" + price + "$";
        dropdownMenu.append(image, p, li)
        li.style.color = "black"
        calcCount()
        TotalPrice()
    }
})
dropdown.onclick = function () {
    dropdownMenu.style.display = "block";
}
calcCount()

function calcCount() {
    if ("basket" == null) {
        localStorage.setItem("basket", JSON.stringify([]))
    }
    let prodCount = document.querySelector(".prodCount")
    let basket = JSON.parse(localStorage.getItem("basket"))
    prodCount.innerHTML = basket.length
    console.log(basket);
}

TotalPrice()

function TotalPrice() {
    let totalPrice = document.querySelector(".totalPrice")
    if ("basket" == null) {
        localStorage.setItem("basket", JSON.stringify([]))
    }
    let basket = JSON.parse(localStorage.getItem("basket"))
    let total = basket.reduce((total, p) => {
        return total += +p.price * p.count;
    }, 0)
    totalPrice.innerHTML = total;
}