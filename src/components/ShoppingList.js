import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  useEffect(()=> {
    fetch(" http://localhost:4000/items")
    .then((res)=> res.json())
    .then((data)=> setItems(data))
  }, [])

  function handleDeleteItem(deletedItem){
    const updatedItems = items.filter((item)=> item.id !== deletedItem.id )
    setItems(updatedItems);
    // console.log("In ShoppingCart:", deletedItem)
  }
  function handleUpdateItem(updatedItem){
    // console.log("In ShoppingCart:", updatedItem)
    const updatedItems = items.map((item)=> {
      if(items.id === updatedItem.id){
        return updatedItem;
      } else {
        return item;
      }
    })
    setItems(updatedItems);
  }
  function handleAddItems(newItem){
    console.log("In ShoppingList:", newItem)
    setItems([...items, newItem])
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }


  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItems} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
