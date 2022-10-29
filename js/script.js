/* //////////////////////////////////////////////////////////// Toggle Mode : dark-mode , light-mode //////////////////////////////////////////////////////////// */
var modeElem = document.querySelector(".mode");
// when click on "dark-mode" icon 
modeElem.addEventListener("click",function(){
    // if <body></body> contains class "dark" then remove it , else add it
    if ( document.body.classList.contains("dark") )
    {
        document.body.classList.remove("dark");
        // replace the mode-icon from "sun" to "moon"
        document.querySelector(".mode i").classList.replace("fa-sun","fa-moon");
    }
    else
    {
        document.body.classList.add("dark");
        // replace the mode-icon from "sun" to "moon"
        document.querySelector(".mode i").classList.replace("fa-moon","fa-sun")
    }
});
/* //////////////////////////////////////////////////////////// Cruds Operations //////////////////////////////////////////////////////////// */
// ++++++++++++++++++++++++++++++++++ Call All inputFields ++++++++++++++++++++++++++++++++++
let title    = document.getElementById("title"),
    price    = document.getElementById("price"),
    taxes    = document.getElementById("taxes"),
    ads      = document.getElementById("ads"),
    discount = document.getElementById("discount"),
    total    = document.getElementById("total"),
    count    = document.getElementById("count"),
    category = document.getElementById("category"),
    submit   = document.getElementById("submit") ,
    // Mode of "Create Button" [ default btnMode = "create" ] 
    btnMode = "create" ,
    // "Global Variable" to store "table row index"
    tmp ;

// ++++++++++++++++++++++++++++++++++ Calculate "Total Price" function ++++++++++++++++++++++++++++++++++
// Create "getTotal" Function , this function will call when write on any inputField such "price","taxes","ads","discount" 
function getTotal() 
{
    // Check if "price" inputField is empty or not
    if( price.value != "" )
    {
        // The value of "inputFields" is "string" value , to convet it to "integer" , you can use two ways :
        // 1- you can write "+" sign before "inputField" value
        // 2- you can use "parseInt" function 
        let result = ( (+price.value) + (+taxes.value) + (+ads.value) ) - ( (+discount.value) ) ;
        // put the "result" in "total" span 
        total.innerHTML = result ;
        // Give Style to total span
        total.style.background = "#040" ;
    }
    else
    {
        // make the "total" span is empty
        total.innerHTML = "" ;
        // Give Style to total span
        total.style.background = "#a00d02" ;   
    }
}
// ++++++++++++++++++++++++++++++++++ Create "New Product" function ++++++++++++++++++++++++++++++++++
// store "inputFields value" in array
var dataProArr ;
// ++++++++++++++++++++++++++++++++++ Save Data in "Local Storage"  ++++++++++++++++++++++++++++++++++
// Check "Local Storage" Status 
// 1- if "localStorage" has data then put them in "dataProArr Array"
if( localStorage.product != null )
{
    dataProArr = JSON.parse(localStorage.product);
}
// 2- else make "dataProArr Array" empty
else
{
    dataProArr = [] ;
}
// When Click on "Create" button , Get all "inputFields value" and store them in "object" then store "object" in "array"
submit.onclick = function() 
{
    // Get all "product info" and Store them in "object"
    var newProdObj = 
    {
        // Get "title inputField value" and "convert it to lowercase for searching" and "store" it in "title property"
        title: title.value.toLowerCase() ,
        // Get "price inputField value"  and "store" it in "price property"
        price: price.value,
        // Get "taxes inputField value"  and "store" it in "taxes property"
        taxes: taxes.value,
        // Get "ads inputField value"  and "store" it in "ads property"
        ads: ads.value,
        // Get "discount inputField value"  and "store" it in "discount property"
        discount: discount.value,
        // Get "total span value"  and "store" it in "total property"
        total: total.innerHTML,
        // Get "count inputField value"  and "store" it in "count property"
        count: count.value,
        // Get "category inputField value" and convert it to lowercase for searching" and "store" it in "category property"
        category: category.value.toLowerCase() 
    }
    // ++++++++++++++++++++++++++++++++++ Create "New Product" According to "count value" inputField ++++++++++++++++++++++++++++++++++
    // Check if "tital And Price inputField" is empty or not  and the "count value" < 100
    if( title.value != "" && price.value != "" && category.value != "" && count.value < 100 )
    {
        // ===== When "btnMode" is "create" then Create a new Product =====
        if( btnMode == "create" )
        {
            // Check if count > 1 Then Create "products" According to "Count inputField" value
            if( newProdObj.count > 1 )
            {
                // Loop iterations = newProdObj.count , each iteration , push row in table
                for( var j = 0 ; j < newProdObj.count ; j++ )
                {
                    // push "newPro object" in "array" to keep "product data" from "override" When "add new product"
                    dataProArr.push(newProdObj);
                }
            }
            // if count < 1  , Create only "one product"
            else
            {
                // push "newPro object" in "array" to keep "product data" from "override" When "add new product"
                dataProArr.push(newProdObj);
            }
        }
        // ===== When "btnMode" is "update" then "update" The "selected Product" =====
        else
        {        
            dataProArr[tmp] = newProdObj ;    
            // After the update , return the btnMode to the default value "creatte"
            btnMode="create";
            // After the update , make the innerHTML of "update" to "create"
            submit.innerHTML = "Create";
            // Appear "count" inputField
            count.style.display = "block";
        }
        // ============== Call clearData() function After Creating "new product" =================
        clearData();
    }
   
    // ============= Save LocalStorage =============
    // Store "product object" in "Local storage" to "keep data" from "losing" when "page reload"
    localStorage.setItem("product", JSON.stringify(dataProArr) );
    // ============== Call showData() function =================
    showData();
} ;
// ++++++++++++++++++++++++++++++++++ Clear "inputFields" After Clicking on "Create" button ++++++++++++++++++++++++++++++++++
function clearData() 
{
    // Clear "title inputField" from "data"
    title.value = "" ;
    // Clear "price inputField" from "data"
    price.value = "" ;
    // Clear "taxes inputField" from "data"
    taxes.value = "" ;  
    // Clear "ads inputField" from "data"
    ads.value = "" ;
    // Clear "discount inputField" from "data"
    discount.value = "" ;
    // Clear "count inputField" from "data"
    count.value = "" ;
    // Clear "total span" from "data"
    total.innerHTML = "" ;
    // Clear "category inputField" from "data"
    category.value = "" ;
}
// ++++++++++++++++++++++++++++++++++ Read Data From "inputFields" and Display them In "Table"  ++++++++++++++++++++++++++++++++++
function showData() 
{
    
    // Table Body 
    let table = '' ;
    for ( var i = 0 ; i < dataProArr.length ; i++ ) 
    {
        table += `  
                    <tr>
                        <td> ${i+1}                    </td>
                        <td> ${dataProArr[i].title}    </td>
                        <td> ${dataProArr[i].price}    </td>
                        <td> ${dataProArr[i].taxes}    </td>
                        <td> ${dataProArr[i].ads}      </td>
                        <td> ${dataProArr[i].discount} </td>
                        <td> ${dataProArr[i].total}    </td>
                        <td> ${dataProArr[i].count}    </td>
                        <td> ${dataProArr[i].category} </td>
                        <td>
                            <!-- "i" is the index of the "product row" in the "table" that will be Updated -->
                            <button onclick="updateData(${i})"  id="update">Update</button>
                        </td>
                        <td>
                            <!-- "i" is the index of the "product row" in the "table" that will be deleted -->
                            <button onclick="deleteDate(${i})" id="delete">Delete</button>
                        </td>                        
                    </tr>
                `;
    }
    // add "table variable" to "table body"
    document.getElementById("tbody").innerHTML = table ; 
    // ++++++++++++++++++++++++++++++++++ Create "deleteAll" button ++++++++++++++++++++++++++++++++++
    // "DeleteAllButton" Container
    let deleteAllParent = document.getElementById("deleteAll"); 
    // 1- if "table" contains Data , Create "Delete All Button"
    if( dataProArr.length  >  0 )
    {
        // Call "deleteAll" function When Click on "deleteAll" button , "number of products" == length of "dataProArr" Array
        deleteAllParent.innerHTML = `<button onclick="deleteAll()">Delete All (${dataProArr.length}) </button>`;
    }
    // 2- if "table" is "Empty" , Remove "Delete All Button"
    else
    {
        deleteAllParent.innerHTML = "" ;
    }
    // 3- Call the "get Total Function"
    getTotal();  
    
}
// Call showData() Continously To Show Data in Table otherwise Click on "create button" or not 
showData() ; 
// ++++++++++++++++++++++++++++++++++ Delete "one"  Product ++++++++++++++++++++++++++++++++++
// When click on "delete button" in table , delete the "row" where the "button is clicked"
// send the "row index" to the function
function deleteDate(rowIndex)
{
    // Delete "row" where the "button is clicked" , using function : splice(startIndex, deleteCount )
    // Now You Delete "product" From Array , But the "product" still exists in "localStorage"
    // 1- Delete the "product" From "dataProArr Array"
    dataProArr.splice(rowIndex,1);
    // 2- Delete the "product" From "LocalStorage" , Through Storing The "Array After Delete Product" in "localStorage"
    localStorage.product = JSON.stringify(dataProArr) ;
    // 3- Show the "new Table" After "delete product"
    showData(); 
}
// ++++++++++++++++++++++++++++++++++ "Delete All" Products Function ++++++++++++++++++++++++++++++++++
function deleteAll()
{
    // 1- Delete all "products" from "localStorage"
    localStorage.clear();
    // 2- Delete all "products" from "Array"
    dataProArr.splice(0);
    // 3- Show the "new Table" After "delete All product"
    showData();    
}
// ++++++++++++++++++++++++++++++++++ "Update" Product Function ++++++++++++++++++++++++++++++++++
function updateData(i)
{
    // 1- When Click on "update button" , Return each "inputField value" to "inputField" To "modify" the its value 
    title.value     = dataProArr[i].title;
    price.value     = dataProArr[i].price;
    taxes.value     = dataProArr[i].taxes;
    ads.value       = dataProArr[i].ads; 
    discount.value  = dataProArr[i].discount;
    category.value  = dataProArr[i].category;
    // Call "getTotal()" function to get total value in span
    getTotal();
    // Hide "count" inputField
    count.style.display = "none";
    // Change "innerHtml" of "Create button" to "Update button" 
    // if The btnMode="update", Then When click on "Create button" , Change innerHtml of "Create button" to "Update button" , and Update "table row"
    btnMode = "update";
    submit.innerHTML = "Update";
    // Assign "index of selected table row" to "Global Variable" to store "row index" that will be updated 
    tmp = i ;
    // 2- After Modifying the "inputFields value" , Go To "Click Submit Button Event" and "Update" the "row value" of the "product" 
    
    // 3- When Click on "update button" , Scroll To Top
    scroll({
        top: 0 ,
        // to make "smooth scroll" 
        behavior: "smooth"
    });
}
// ++++++++++++++++++++++++++++++++++ Search on Product ++++++++++++++++++++++++++++++++++
// 1- "Search Mode" variable
var searchMode = "title" ;
// 2- Create "search Mode" Function
function getSearchMode(searchBtnIdPara)
{
    // Get "search inputField" 
    var searchInputField = document.getElementById("search");
    // Focus on "search inputField"
    searchInputField.focus();
    // Empty the "search inputField" When click on "Search By Title" button or "Search By Category" button
    searchInputField.value = "" ;
    // Call "showData()" function
    showData();
    // 1- When Click on "searchTitle" button , Make searchMode = "title"
    if( searchBtnIdPara == "searchTitle" )
    {
        searchMode = "title" ;
    }
    // 2- When Click on "searchCategory" button , Make searchMode = "category"
    else
    {
        searchMode = "category" ;
    }
    // Set "Placeholder" of "search inputField" to "Search By ${searchMode}"
    searchInputField.placeholder = "Search By "+searchMode ;
}
// 3- Create "search Data" Function
// This function Will be called When "Focus on" search inputField
function searchData(searchInpValPara)
{
    let table = '';
    // Go To Table , and search on the "title or category" of "all products" and Get "all rows" that there "title or category" match the "search inputField" value
    for( let i=0 ; i < dataProArr.length ; i++ ) 
    {
        // 1- When Click on "searchTitle" button [  searchMode == "title" ] , Search According To "title"
        if( searchMode == "title" )
        {
        
            // We will "include" function in search , stringName.includes("searchWord or searchChar") : return true or false
            // i will compare "each product title" with "the search inputField value" [ convert searchInputField value to lowercase to make correct search]
            if( dataProArr[i].title.includes(searchInpValPara.toLowerCase() ) )
            {
                // Override on "the Previous Table Data" with "the search data"
                table += `  
                        <tr>
                            <td> ${i+1}                    </td>
                            <td> ${dataProArr[i].title}    </td>
                            <td> ${dataProArr[i].price}    </td>
                            <td> ${dataProArr[i].taxes}    </td>
                            <td> ${dataProArr[i].ads}      </td>
                            <td> ${dataProArr[i].discount} </td>
                            <td> ${dataProArr[i].total}    </td>
                            <td> ${dataProArr[i].count}    </td>
                            <td> ${dataProArr[i].category} </td>
                            <td>
                                <!-- "i" is the index of the "product row" in the "table" that will be Updated -->
                                <button onclick="updateData(${i})"  id="update">Update</button>
                            </td>
                            <td>
                                <!-- "i" is the index of the "product row" in the "table" that will be deleted -->
                                <button onclick="deleteDate(${i})" id="delete">Delete</button>
                            </td>                        
                        </tr>
                    `;
                
            }   
        }
        // 2- When Click on "searchCategory" button [  searchMode == "category" ] , Search According To "category"
        else
        {
            // We will "include" function in search , stringName.includes("searchWord or searchChar") : return true or false
            // i will compare "each product category" with "the search inputField value" [ convert searchInputField value to lowercase to make correct search]
            if( dataProArr[i].category.includes(searchInpValPara.toLowerCase() )  )
            {
                // Override on "the Previous Table Data" with "the search data"
                table += `  
                        <tr>
                            <td> ${i+1}                    </td>
                            <td> ${dataProArr[i].title}    </td>
                            <td> ${dataProArr[i].price}    </td>
                            <td> ${dataProArr[i].taxes}    </td>
                            <td> ${dataProArr[i].ads}      </td>
                            <td> ${dataProArr[i].discount} </td>
                            <td> ${dataProArr[i].total}    </td>
                            <td> ${dataProArr[i].count}    </td>
                            <td> ${dataProArr[i].category} </td>
                            <td>
                                <!-- "i" is the index of the "product row" in the "table" that will be Updated -->
                                <button onclick="updateData(${i})"  id="update">Update</button>
                            </td>
                            <td>
                                <!-- "i" is the index of the "product row" in the "table" that will be deleted -->
                                <button onclick="deleteDate(${i})" id="delete">Delete</button>
                            </td>                        
                        </tr>
                    `;
            
            }
        }   
    }
    // add "table variable" to "table body"
    document.getElementById("tbody").innerHTML = table ; 
}
// ++++++++++++++++++++++++++++++++++ Check on Clean ++++++++++++++++++++++++++++++++++
// Check if user Enter Value on each inputField in inputFields or not , Make Control on "user data"
