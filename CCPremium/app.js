// MVC structure used for round two

//IIFE
(function(){

	//DOM elements
	var nameInput = document.getElementById('input-name'),
		urlInput = document.getElementById('input-url'),
		clickInput = document.getElementById('input-click'),
		adminButton = document.querySelector('.admin-button'),
		adminSubmit = document.querySelector('.admin-submit');
		adminCancel = document.querySelector('.admin-cancel');

	// Model - All data here, * only interacts with controller
	// never with view directly *
    var model = {

        // Current Cat is set to zero
		currentCatIndex: 0,

		// All cats in the form of individual objects
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

		// set the initial count of each cat to zero
        initCount: function(array) {
            array.forEach(function(item, index){
                item.count = 0;
            });
        }
    };

	// Controller - Between Model and View Items
    var controller = {

		// initialize everything
        init: function(){
            var data = controller.getAllData();
            model.initCount(data);
            viewButtons.init(data);
            viewImg.render(model.currentCatIndex);
			viewAdmin.init();
        },
        getAllData: function(){
            return model.data;
        },
        attachListEvents: function() {
            var listElements = document.querySelectorAll('.list-button');
            listElements.forEach(function(el, index){
                el.addEventListener('click',function(){
                    controller.showImage(index);
					// Set the current cat to the last item clicked
					model.currentCatIndex = index;
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
        },
		adminHideShow: function() {
			var adminContent = document.querySelector('.admin-controls');
			adminContent.classList.toggle('hidden');
		},
		adminSubmit: function(event) {
			event.preventDefault();
			var catObject = model.data[model.currentCatIndex],
				updatedValues = controller.getInputValue();

			catObject.name = updatedValues.name;
			catObject.src = updatedValues.src;
			catObject.count = updatedValues.count;
			
			viewImg.renderCount(catObject.count);
			controller.updateNames(catObject.name);
		},
		adminCancel: function(event) {
			event.preventDefault();
			viewAdmin.render();
			controller.adminHideShow();
		},
		getInputValue: function() {
			var valueObject = {};
			valueObject.name = nameInput.value;
			valueObject.src = urlInput.value;
			valueObject.count = clickInput.value;
			return valueObject;
		},
		updateNames: function(name) {
			var currentListButton = document.querySelector('.list-button-' + model.currentCatIndex),
				currentTitle = document.querySelector('.title-current');
			currentListButton.innerText = name;
			currentTitle.innerText = name;
		}
    };
    var viewButtons = {
        createButton: function(obj, index) {
            var button = document.createElement('button');
            button.innerText = obj.name;
            button.classList.add('list-button');
			button.classList.add('list-button-' + index);
            return button;
        },
        render: function(buttons, callback){
            var viewContainer = document.querySelector('.main-list-view');
            buttons.forEach(function(button, index){
                var renderItem = viewButtons.createButton(button, index);
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
			title.classList.add('title-current');
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
	// Admin controls view
	var viewAdmin = {
		// initialize all buttons once and once only
		init: function() {
			viewAdmin.render();
			adminButton.addEventListener('click', controller.adminHideShow);
			adminSubmit.addEventListener('click', controller.adminSubmit);
			adminCancel.addEventListener('click', controller.adminCancel);
		},
		render: function() {

			var catObject = model.data[model.currentCatIndex];
			
			nameInput.setAttribute('value', catObject.name);
			urlInput.setAttribute('value', catObject.src);
			clickInput.setAttribute('value', catObject.count);
		}
	}

	// Starts here, initiates here
    controller.init();
})();
