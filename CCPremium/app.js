// MVC structure used for round two

//IIFE
(function(){
    var model = {
        // All cats are individual objects
        data: [
            {
                src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
                name: "Mittens"
            },
            {
                src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
                name: "Smittens"
            },
                    {
                src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
                name: "Buttons"
            },
            {
                src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
                name: "Pancake"
            },
                    {
                src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
                name: "Flossy"
            },
            {
                src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
                name: "Garfield"
            }
        ],
        updateCount: function(itemNumber) {
            var currentCount = data[itemNumber].count;
            currentCount++
            return currentCount;
        },
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
            console.log(number);
        },
        showImage: function(indexNumber) {
            viewImg.render(indexNumber, controller.attachImgEvent(indexNumber));
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
            count.innerText = obj.count;

            container.appendChild(title);
            container.appendChild(image);
            container.appendChild(count);

            return container;
        },
        render: function(item, callback){
            var viewContainer = document.querySelector('.main-img-view');
            viewContainer.innerHTML = '';
            var renderItem = viewImg.createImage(item);
            viewContainer.appendChild(renderItem);
            // callback(item);
        }
    };
    controller.init();
})();
