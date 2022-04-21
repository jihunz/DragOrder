// class DragOrder {
//     constructor(list, direction) {
//         this.setFlex(list, direction);
//         this.setDragEvent(list);

//         this.moveOrder = this.moveOrder.bind(this);
//     }

//     setFlex(list, direction) {
//         document.querySelector(list).setAttribute("style", "display: flex; flex-direction: column;");
//     }

//     setDragEvent(list) {
//         let dragItem = document.querySelectorAll(".dragItem");

//         Array.from(dragItem).forEach(function (item, index) {
//             item.setAttribute("draggable", true);
//             item.setAttribute("data-order", index);

//             // dragstart
//             item.addEventListener("dragstart", e => {
//                 console.log(`dragStart: ${e.target.dataset["order"]}`);

//                 e.target.classList.add("dragStart");

//                 e.dataTransfer.setData("text/plain", e.target.dataset["order"]);
//             });

//             // dragenter
//             item.addEventListener("dragenter", e => {
//                 console.log(`dragenter: ${e.target.dataset["order"]}`);

//                 e.target.classList.add("dragOver");
//             });

//             // dragleave
//             item.addEventListener("dragleave", e => {
//                 console.log(`dragleave: ${e.target.dataset["order"]}`);

//                 e.target.classList.remove("dragOver");
//             });

//             // dragover
//             item.addEventListener("dragover", e => {
//                 console.log(`dragover: ${e.target.dataset["order"]}`);

//                 // 드래그가 끝났을 때 이벤트 버블링을 방지 -> event canceling
//                 e.preventDefault();
//             });

//             // dragend
//             item.addEventListener("dragend", e => {
//                 e.target.classList.remove("dragStart");
//             });

//             // drop
//             item.addEventListener("drop", e => {
//                 console.log(`drop: ${e.target.dataset["order"]}`);

//                 e.preventDefault();

//                 e.target.classList.remove("dragOver");

//                 const source = e.dataTransfer.getData("text/plain");
//                 const target = e.target.dataset["order"];

//                 console.log(`MOVE: ${source} ===>>> ${target}`);

//                 this.moveOrder(source, target);
//             });
//         });
//     }

//     moveOrder(source_, target_) {
//         const source = parseInt(source_);
//         const target = parseInt(target_);

//         Array.from(dragItem).forEach(function (item) {
//             const order = parseInt(item.dataset["order"]);

//             if (source < target) {
//                 if (order == source) {
//                     item.dataset["order"] = target;

//                     //구간 내에 있는 요소만 변동
//                 } else if (order > source && order <= target)
//                     item.dataset["order"] = order - 1;
//             } else {
//                 if (order == source)
//                     item.dataset["order"] = target;
//                 else if (order < source && order >= target)
//                     item.dataset["order"] = order + 1;
//             }
//         });

//         Array.from(dragItem).forEach(function (item) {
//             item.setAttribute("style", `order: ${item.dataset["order"]}`);
//         });
//     }
// }