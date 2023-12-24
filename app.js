$(document).ready(() => {

    let itemNum = 0; // Initialize itemNum

    // Function to update item number display
    function updateItemNum() {
        $('.item-num').html(`${itemNum} items left`);
    }

    // add item
    $('#add-new-item').click(() => {
        let title = $('#new-item').val();

        let item = `
            <li draggable="true" class="item-list flex items-center gap-2 rounded-md">
                <button class="check-item grid place-items-center border border-neutral-500 w-[25px] h-[25px] rounded-full text-sm text-white">
                    <i class="fa fa-check hidden"></i>
                </button>
                <p>${title}</p>

                <i class="fa fa-close ml-auto"></i>
            </li>
        `;

        itemNum++;
        updateItemNum(); // Update item number display
        $('.list').append(item);
        $('#new-item').val('');

        // check item completed
        $('.check-item').click((e) => {
            $(e.target).addClass('bg-gradient-to-br');
            $(e.target).addClass('from-[#74B7FC]');
            $(e.target).addClass('to-[#A272EA]');
            $(e.target).children('.fa-check').removeClass('hidden');
            $(e.target).siblings().css('text-decoration', 'line-through');
        });

        // remove and item
        $('.fa-close').click((e) => {
            itemNum--;
            updateItemNum(); // Update item number display
            $(e.target).parent().remove();
        });

    });

    
    // rearrange the list
    const sortableList = document.getElementById('sortableList');

    sortableList.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.outerHTML);
        e.target.classList.add('dragging');
    });

    sortableList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingElement = document.querySelector('.dragging');
        const closestLi = getClosestLi(e.clientY);

        if (closestLi) {
            sortableList.insertBefore(draggingElement, closestLi);
        } else {
            sortableList.appendChild(draggingElement);
        }
    });

    sortableList.addEventListener('dragend', (e) => {
        const draggingElement = document.querySelector('.dragging');
        draggingElement.classList.remove('dragging');
    });

    function getClosestLi(y) {
        const lis = Array.from(sortableList.children);
        return lis.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // toggle theme
    function toggleTheme() {
        $('body').toggleClass('dark');
        $('body').toggleClass('light');
        $('.item-list').toggleClass('dark');
        $('.item-list').toggleClass('light');
    }

    // Theme toggle button click event
    $('.toggle-theme').click(() => {
        toggleTheme();
    });

});
