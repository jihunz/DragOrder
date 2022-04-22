class DragOrder {
    constructor(list, direction) {
        this.addFlex(list, direction);
        this.addDragEvent(list);
    }

    addFlex(list, direction) {
        $(list).css({
            "display": "flex",
            "flex-direction" : direction == true ? "row" : "column"
        });
    }

    addDragEvent(list) {
            $(`${list} > .dragItem`).each((index, item) => {
                $(item).attr("draggable", true).attr("data-order", index);

                // dragstart
                $(item).on("dragstart", e => {
                    $(e.target).addClass("dragStart");

                    e.originalEvent.dataTransfer.setData("text/plain", e.target.dataset["order"]);
                });

                // dragenter
                $(item).on("dragenter", e => $(e.target).addClass("dragOver"));

                // dragleave
                $(item).on("dragleave", e => $(e.target).removeClass("dragOver"));

                // dragover
                $(item).on("dragover", e => e.preventDefault());

                // dragend
                $(item).on("dragend", e => $(e.target).removeClass("dragStart"));

                // drop
                $(item).on("drop", e => {
                    e.preventDefault();

                    $(e.target).removeClass("dragOver");

                    const source = e.originalEvent.dataTransfer.getData("text/plain");
                    const target = e.target.dataset["order"];

                    this.moveOrder(source, target, list);
                });
            });
    }

    moveOrder(source_, target_, list) {
        const source = parseInt(source_);
        const target = parseInt(target_);
    
        $(`${list} > .dragItem`).each((index, item) => {
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
    
        $(`${list} > .dragItem`).each((index, item) => item.style.order = item.dataset["order"]);
    }
}