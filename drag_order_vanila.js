class DragOrder {
    constructor(list, direction) {
        this.addFlex(list, direction);
        this.addDragEvent(list);
    }

    addFlex(list, direction) {
        document.querySelector(list).setAttribute("style", `display: flex; flex-direction: ${direction ? "row" : "column;"}`);
    }

    addDragEvent(list) {
        let dragItem = document.querySelectorAll(".dragItem");

        Array.from(dragItem).forEach(function (item, index) {
            item.setAttribute("draggable", true);
            item.setAttribute("data-order", index);

            // dragstart
            item.addEventListener("dragstart", e => {

                e.target.classList.add("dragStart");

                e.dataTransfer.setData("text/plain", e.target.dataset["order"]);
            });

            // dragenter
            item.addEventListener("dragenter", e => e.target.classList.add("dragOver"));

            // dragleave
            item.addEventListener("dragleave", e => e.target.classList.remove("dragOver"));

            // dragover
            item.addEventListener("dragover", e => e.preventDefault());

            // dragend
            item.addEventListener("dragend", e => e.target.classList.remove("dragStart"));

            // drop
            item.addEventListener("drop", function (e) {
                e.preventDefault();

                e.target.classList.remove("dragOver");

                const source_ = e.dataTransfer.getData("text/plain");
                const target_ = e.target.dataset["order"];

                const source = parseInt(source_);
                const target = parseInt(target_);

                Array.from(dragItem).forEach(function (item) {
                    const order = parseInt(item.dataset["order"]);

                    if (source < target) {
                        if (order == source) {
                            item.dataset["order"] = target;
                        } else if (order > source && order <= target)
                            item.dataset["order"] = order - 1;
                    } else {
                        if (order == source)
                            item.dataset["order"] = target;
                        else if (order < source && order >= target)
                            item.dataset["order"] = order + 1;
                    }
                });

                Array.from(dragItem).forEach(function (item) {
                    item.setAttribute("style", `order: ${item.dataset["order"]}`);
                });
            });
        });
    }

    // moveOrder(source_, target_) {
    //     const source = parseInt(source_);
    //     const target = parseInt(target_);

    //     Array.from(dragItem).forEach(function (item) {
    //         const order = parseInt(item.dataset["order"]);

    //         if (source < target) {
    //             if (order == source) {
    //                 item.dataset["order"] = target;
    //             } else if (order > source && order <= target)
    //                 item.dataset["order"] = order - 1;
    //         } else {
    //             if (order == source)
    //                 item.dataset["order"] = target;
    //             else if (order < source && order >= target)
    //                 item.dataset["order"] = order + 1;
    //         }
    //     });

    //     Array.from(dragItem).forEach(function (item) {
    //         item.setAttribute("style", `order: ${item.dataset["order"]}`);
    //     });
    // }
}