class DragOrder {
    constructor(list, direction) {
        this.list = list;
        this.direction = direction;

        this.addFlex(this.list, this.direction);
        this.addDragEvent(this.list);
    }

    addFlex(list, direction) {
        document.querySelector(list).setAttribute("style", `display: flex; flex-direction: ${direction ? "row" : "column;"}`);
    }

    addDragEvent() {
        const dragItem = document.querySelectorAll(".dragItem");

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
            item.addEventListener("drop", e => {
                e.preventDefault();

                e.target.classList.remove("dragOver");

                const source = parseInt(e.dataTransfer.getData("text/plain"));
                const target = parseInt(e.target.dataset["order"]);

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

                Array.from(dragItem).forEach(function (item, index) {
                    const x = 900 - (150 * (index % 6));
                    const y = 198 * parseInt(index / 6);

                    const bg_position = window.getComputedStyle(item)["background-image"] && window.getComputedStyle(item)["background-image"] != "none" ? `background-position-x: ${x}px; background-position-y: ${y}px;` : "";

                    item.setAttribute("style", `order: ${item.dataset["order"]}; ${bg_position}`);
                });
            });
        });
    }
}