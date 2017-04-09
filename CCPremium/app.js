// MVC structure used for round two

//IIFE
(function(){
    var model = {
        // All cats are individual objects
        data: [
            {
                src: "http://placekitten.com/g/300/302",
                name: "Mittens"
            },
            {
                src: "http://placekitten.com/g/300/300",
                name: "Smittens"
            },
                    {
                src: "http://placekitten.com/g/300/301",
                name: "Buttons"
            },
            {
                src: "http://placekitten.com/g/300/303",
                name: "Pancake"
            },
                    {
                src: "http://placekitten.com/g/300/305",
                name: "Flossy"
            },
            {
                src: "http://placekitten.com/g/300/307",
                name: "Garfield"
            }
        ],
        initCount: function(array) {
            array.forEach(function(item, index){
                item.count = 0;
            });
        }
    };
    var controller = {
        init: function(){
            var data = controller.getAllData();
            model.initCount(data);
            viewButtons.init(data);
            viewImg.render(0);
        },
        getAllData: function(){
            return model.data;
        },
        attachListEvents: function() {
            var elements = document.querySelectorAll('.list-button');
            elements.forEach(function(el, index){
                el.addEventListener('click',function(){
                    controller.showImage(index);
                });
            });
        },
        attachImgEvent: function(number) {
            imgEl = document.querySelector('.img-current');
            imgEl.addEventListener('click', function(){
                controller.updateCount(number);
            });
        },
        showImage: function(indexNumber) {
            viewImg.render(indexNumber);
        },
        updateCount: function(itemNumber) {
            var currentCount = model.data[itemNumber].count;
            currentCount++
            model.data[itemNumber].count = currentCount;
            viewImg.renderCount(currentCount);    
        }
    };
    var viewButtons = {
        createButton: function(obj) {
            var button = document.createElement('button');
            button.innerText = obj.name;
            button.classList.add('list-button');
            return button;
        },
        render: function(buttons, callback){
            var viewContainer = document.querySelector('.main-list-view');
            buttons.forEach(function(button){
                var renderItem = viewButtons.createButton(button);
                viewContainer.appendChild(renderItem);
            });
            callback();
        },
        init: function(data) {
            viewButtons.render(data, controller.attachListEvents);
        }
    };
    var viewImg = {
        createImage: function(itemNumber) {

            var obj = controller.getAllData()[itemNumber];

            var container = document.createElement('div'),
                title = document.createElement('h2'),
                image = document.createElement('img'),
                count = document.createElement('p');
            
            title.innerText = obj.name;
            image.setAttribute('src', obj.src);
            image.classList.add('img-current');
            count.innerText = obj.count;
            count.classList.add('count-current');

            container.appendChild(title);
            container.appendChild(image);
            container.appendChild(count);

            return container;
        },
        render: function(item){
            var viewContainer = document.querySelector('.main-img-view');
            viewContainer.innerHTML = '';
            var renderItem = viewImg.createImage(item);
            viewContainer.appendChild(renderItem);
            controller.attachImgEvent(item);
        },
        renderCount: function(count) {
            var countContainer = document.querySelector('.count-current');
            countContainer.innerText = count;
        }
    };
    controller.init();
})();
