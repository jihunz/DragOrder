class DragOrder {
    constructor(list, direction) {
        this.setFlex(list, direction);
        this.setDragEvent(list);
    }

    setFlex(list, direction) {
        $(list).css({
            "display": "flex",
            "flex-direction" : direction == true ? "row" : "column"
        });
    }

    setDragEvent(list) {
            $(`${list} > .dragItem`).each((index, item) => {
                $(item).attr("draggable", true).attr("data-order", index);

                // dragstart
                $(item).on("dragstart", e => {
                    console.log(`dragStart: ${e.target.dataset["order"]}`);

                    // e.target.classList.add("dragStart");
                    $(e.target).addClass("dragStart");

                    e.originalEvent.dataTransfer.setData("text/plain", e.target.dataset["order"]);
                });

                // dragenter
                $(item).on("dragenter", e => {
                    console.log(`dragenter: ${e.target.dataset["order"]}`);

                    $(e.target).addClass("dragOver");
                });

                // dragleave
                $(item).on("dragleave", e => {
                    console.log(`dragleave: ${e.target.dataset["order"]}`);

                    $(e.target).removeClass("dragOver");
                });

                // dragover
                $(item).on("dragover", e => {
                    console.log(`dragover: ${e.target.dataset["order"]}`);

                    // 드래그가 끝났을 때 이벤트 버블링을 방지 -> event canceling
                    e.preventDefault();
                });

                // dragend
                $(item).on("dragend", e => {
                    // e.target.classList.remove("dragStart");
                    $(e.target).removeClass("dragStart");
                });

                // drop
                $(item).on("drop", e => {
                    console.log(`drop: ${e.target.dataset["order"]}`);

                    e.preventDefault();

                    $(e.target).removeClass("dragOver");

                    const source = e.originalEvent.dataTransfer.getData("text/plain");
                    const target = e.target.dataset["order"];

                    console.log(`MOVE: ${source} ===>>> ${target}`);

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
    
                    //구간 내에 있는 요소만 변동
                } else if (order > source && order <= target)
                    item.dataset["order"] = order - 1;
            } else {
                if (order == source)
                    item.dataset["order"] = target;
                else if (order < source && order >= target)
                    item.dataset["order"] = order + 1;
            }
        });
    
        $(`${list} > .dragItem`).each((index, item) => {
            item.style.order = item.dataset["order"];
        });
    }
}