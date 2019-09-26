class dragonEditor{
	constructor(wrap = '.editor_area', options = {}){
		this.setting(wrap, options);
		console.log(this.wrap);
		this.bindingEvent();
		this.closeLoding();
	}

	setting(wrap, options){
		let $this = this;

		$this.windowWidth = window.innerWidth;
		$this.windowHeight = window.innerHeight;
		$this.changePint = typeof options.changePint !== 'string' ? 1120 : options.changePint;

		$this.stickerListName = typeof options.stickerListName !== 'string' ? '.pop_sticker' : options.stickerListName;
		$this.imageIconId = typeof options.imageIconId !== 'string' ? '#icon_image' : options.imageIconId;
		$this.youtubeIconId = typeof options.youtubeIconId !== 'string' ? '#icon_youtube' : options.youtubeIconId;
		$this.codepenIconId = typeof options.codepenIconId !== 'string' ? '#icon_codepen' : options.codepenIconId;
		$this.stickerSize = typeof options.stickerSize !== 'string' ? '0 0 100 100' : options.stickerSize;
		$this.stickerType = options.stickerType === 'image' ? 'image' : 'svg';
		$this.contentAreaName = typeof options.contentAreaName !== 'string' ? '.content_area' : options.contentAreaName;
		$this.popOptionsName = typeof options.popOptionsName !== 'string' ? '.pop_options' : options.popOptionsName;
		$this.popLinkName = typeof options.popLinkName !== 'string' ? '.pop_link_box' : options.popLinkName;

		$this.wrap = $this.checkOptionElement(wrap, '.editor_area');
		$this.editorSection = $this.checkOptionElement(options.editorSection, '.editor_section');
		$this.contentArea = $this.checkOptionElement(options.contentArea, '.content_area');
		$this.contentAddList = $this.checkOptionElement(options.contentAddList, '.pop_content_list');
		$this.popLang = $this.checkOptionElement(options.popLang, '.pop_lang');
		$this.popBgArea = $this.checkOptionElement(options.popBgArea, '.pop_bg');
		$this.popOptions = $this.checkOptionElement(options.popOptions, '.pop_options');
		$this.lodingArea = $this.checkOptionElement(options.lodingArea, '.pop_loding');
		$this.fileInput = $this.checkOptionElement(options.fileInput, '.file_check');
		$this.uploadForm = $this.checkOptionElement(options.uploadForm, '.file_uploader');
		$this.contentDelBtn = $this.checkOptionElement(options.contentDelBtn, '.btn_del_content');
		$this.contentAddBtn = $this.checkOptionElement(options.contentAddBtn, '.btn_add_content', 'multi');
		$this.viewBtn = $this.checkOptionElement(options.viewBtn, '.btn_mod');
		$this.popBtns = $this.checkOptionElement(options.popBtn, '.btn_pop', 'multi');
		$this.changeAreaBtn = $this.checkOptionElement(options.changeAreaBtn, '.btn_change_area');

		$this.HTMLTextBlock = '<p class="item item_text" contenteditable="true">[content]</p>';
		$this.HTMLBtn = '<button class="btn" data-type="[type]"><svg viewbox="0 0 50 50" class="icon"><use class="path" xlink:href="[icon_id]" href="[icon_id]" /></svg>[text]</button>';
		$this.HTMLSvgSticker = '<svg viewbox="[size]" class="item item_sticker" data-type="sticker"><use class="path" xlink:href="[url]" href="[url]" /></svg>';
		$this.HTMLList = '<[tag] [type] class="item item_list">[child]</[tag]>';
		$this.HTMLChildList = '<li contenteditable="true">[content]</li>';
		$this.HTMLQuote = '<blockquote class="item item_quote"><p class="text" contenteditable="true"></p><p class="author" contenteditable="true"></p></blockquote>';
		$this.HTMLTable = '<div class="item item_table_area" data-type="table"><table class="item_table"><caption contenteditable="true"></caption><colgroup><col class="size_100"><col class="size_100"><col class="size_100"><col class="size_100"></colgroup><thead><tr><th contenteditable="true"></th><th contenteditable="true"></th><th contenteditable="true"></th><th contenteditable="true"></th></tr></thead><tbody><tr><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td></tr></tbody></table></div></div>';
		$this.HTMLCodeBlock = '<pre class="item item_codeblock" data-theme="default" data-lang="text"><code class="nohighlight" contenteditable="true"></code></pre>';
	}

	bindingEvent(){
		let $this = this;

		// right click block and content menu open
		document.addEventListener('contextmenu', function(e){
			e.preventDefault();
		});

		document.addEventListener('mouseup', function(e){
			if(typeof e === 'object'){
				let target = e.target;
				switch(e.button){
					case 0 : 
						let $pop = $this.findParent(target, 'pop');
						let $btnPop = $this.findParent(target, 'btn_pop');
						let $popEl = $this.getElList('.pop');

						$popEl.forEach(function(item){
							if($btnPop === false){
								if(!item.classList.contains($this.popOptionsName.substr(1))){
									item.classList.remove('act');
								}
							}else{
								let name = $btnPop.dataset['target'];

								if(item !== $this.getEl(name)){
									item.classList.remove('act');
								}
							}
						});

						$this.popBtns.forEach(function(btn){
							if($btnPop !== btn){
								btn.classList.remove('act');
							}
						});

						if($pop !== false){
							$pop.classList.add('act');
						}
					break;

					case 2 : 
						if($this.windowWidth > $this.changePint){
							let $area = $this.findParent(target, 'content_area');
							let x = e.clientX;
							let y = e.clientY;
							let $list = $this.getEl('.pop_content_list');

							if($area !== false){
								$list.style.cssText = 'top:0;left:0;transform:translate('+ x +'px, '+ y +'px)';
								$list.classList.add('act');
							}
						}
					break;
				}
			}
		});

		$this.contentArea.addEventListener('mouseup', function(e){
			let $target = $this.getLastSetOrFocus(e.target);

			if($target !== false){
				let offset = $target.getBoundingClientRect();
				let type = $target.dataset['type']
				$this.openOptionPop(offset, type);
				console.log("up");
			}
		});

		$this.contentArea.addEventListener('mousedown', function(e){
			console.log('down');
			console.log(e.target);
		});

		$this.contentArea.addEventListener('mouseover', function(e){
			if($this.windowWidth > $this.changePint){
				let $target = $this.getLastSetOrFocus(e.target);

				if($target !== false){
					let offset = $target.getBoundingClientRect();
					let type = $target.dataset['type']
					$this.openOptionPop(offset, type);
				}
			}
		});

		$this.editorSection.addEventListener('mouseleave', function(e){
			if($this.windowWidth > $this.changePint){
				$this.popOptions.classList.remove('act');
			}
		});

		// key event control
		$this.contentArea.addEventListener('keydown', function(e){
			console.log('keydown');
			console.log(e.target);
		});

		// content add event
		$this.contentAddBtn.forEach(function($btn){
			$btn.addEventListener('click', function(){
				let type = this.dataset['value'];
				let childCount = $this.contentArea.childElementCount;
				let $lastEl = $this.contentArea.querySelector('.lastset');
				let $target = $lastEl === null ? $this.contentArea.children[childCount - 1] : $lastEl

				$this.contentAddList.classList.remove('act');
				switch(type){
					case 'text':
						$this.addTextBlock($target);
					break;
					case 'image':
						$this.addBtn($target, $this.imageIconId, 'image', 'Add on image');
						$this.fileInput.setAttribute('accept', 'image/*');
						$this.fileInput.click();
					break;
					case 'sticker':
						let url = this.dataset['url'];
						$this.addSticker($target, url, $this.stickerSize, $this.stickerType);
					break;
					case 'youtube':
						$this.addBtn($target, $this.youtubeIconId, 'youtube', 'Add Youtube');
					break;
					case 'codepen':
						$this.addBtn($target, $this.codepenIconId, 'codepen', 'Add Codepen');
					break;
					case 'bulletedlist':
						$this.addList($target, 'ul');
					break;
					case 'numberedlist':
						$this.addList($target, 'ol', '1');
					break;
					case 'quote':
						$this.addQuote($target);
					break;
					case 'table':
						$this.addTable($target);
					break;
					case 'codeblock':
						$this.addCodeBlock($target);
					break;
				}
			});
		});

		// change view size
		$this.viewBtn.addEventListener('click', function(){
			$this.editorSection.classList.toggle('mobile');
			this.classList.toggle('act');
		});

		// switch editor section
		$this.changeAreaBtn.addEventListener('click', function(){
			let $target = $this.editorSection;
			let status = $target.dataset['status'];
			let value = status === 'editor' ? 'options' : 'editor';
			let $pop = $this.getElList('.pop.act');

			$this.editorSection.dataset['status'] = value;
			$this.popLang.classList.toggle('hidden');
			this.classList.toggle('act');

			if($pop !== false){
				$pop.forEach(function(item){
					item.classList.remove('act');
				});
			}

			if($target.classList.contains('mobile') === true){
				$target.classList.remove('mobile');
				$this.viewBtn.classList.remove('act');
			}
		});

		// pop btns work
		$this.popBtns.forEach(function(btn){
			btn.addEventListener('click', function(){
				let status = $this.editorSection.dataset['status'];
				let target = this.dataset['target'];
				let $el = $this.getEl(target);

				if(status !== 'options'){
					this.classList.toggle('act');
					$el.removeAttribute('style');
					$el.classList.toggle('act');

					if(target === $this.stickerListName || target === $this.popLinkName){
						$this.contentAddList.classList.remove('act');
					}
				}else{
					return false;
				}
			});
		});

		let $linkCheckBtn = $this.getEl($this.popLinkName + ' .btn_check');
		if($linkCheckBtn !== false){
			$linkCheckBtn.addEventListener('click', function(){
				let url = $this.getEl($this.popLinkName + ' .url').value;
			});
		}else{
			console.warn('We need link check btn from ' + $this.popLinkName);
		}













		window.addEventListener('resize', function(){
			$this.windowWidth = window.innerWidth;
			$this.windowHeight = window.innerHeight;

			$this.contentDelBtn.removeAttribute('style');

			return;
		});
	}

	checkOptionElement(name, defaultName, type = 'single'){
		let $item;
		if(type ===  'single'){
			$item = typeof name !== 'string' ? this.getEl(defaultName) : this.getEl(name);
		}else{
			$item = typeof name !== 'string' ? this.getElList(defaultName) : this.getElList(name);
		}

		if($item === false){
			console.error('Can not find Element : ' + name);
		}else{
			return $item;
		}
	}

	getEl(name){
		let $el = document.querySelector(name);

		if($el === null){
			return false;
		}else{
			return $el;
		}
	}

	getElList(name){
		let $el = document.querySelectorAll(name);

		if($el.length < 1){
			return false;
		}else{
			return $el;
		}
	}

	findParent($el, name){
		if($el.constructor.name !== 'HTMLBodyElement'){
			let check = $el.classList.contains(name);

			if(check === true){
				return $el;
			}else{
				return this.findParent($el.parentElement, name);
			}
		}else{
			return false;
		}
	}

	closeLoding(){
		this.popBgArea.classList.remove('act');
		this.lodingArea.classList.remove('act');
	}

	addTextBlock($target, content = ''){
		let html = this.HTMLTextBlock.replace('[content]', content);

		$target.insertAdjacentHTML('afterend', html);
		$target.nextElementSibling.focus();
	}

	addBtn($target, icon, type, text){
		let html = this.HTMLBtn.replace(/\[icon_id\]/g, icon)
					.replace(/\[type\]/g, type)
					.replace(/\[text\]/g, text);

		$target.insertAdjacentHTML('afterend', html);
	}

	addSticker($target, url, size, type){
		let html = this.HTMLSvgSticker.replace(/\[url\]/g, url)
					.replace(/\[size\]/g, size);

		$target.insertAdjacentHTML('afterend', html);
	}

	addList($target, tag, type = null, content = ''){
		let attribute = type === null ? '' : 'type="'+ type +'"';
		let child = this.HTMLChildList.replace(/\[content\]/g, content);
		let html = this.HTMLList.replace(/\[tag\]/g, tag)
					.replace('[type]', attribute)
					.replace('[child]', child);

		$target.insertAdjacentHTML('afterend', html);
		$target.nextElementSibling.children[0].focus();
	}

	addQuote($target){
		$target.insertAdjacentHTML('afterend', this.HTMLQuote);
		$target.nextElementSibling.children[0].focus();
	}

	addTable($target){
		$target.insertAdjacentHTML('afterend', this.HTMLTable);
		$target.nextElementSibling.querySelector('caption').focus();
	}

	addCodeBlock($target){
		$target.insertAdjacentHTML('afterend', this.HTMLCodeBlock);
		$target.nextElementSibling.children[0].focus();
	}

	addLink($target){
		
	}

	getLastSetOrFocus($target){
		let $activeEl = document.activeElement;

		if($activeEl.constructor.name !== 'HTMLBodyElement'){
			return this.findParent($activeEl, 'item');
		}else{
			let $item = this.findParent($target, 'item');
			let $el = $item === false ? this.findParent($target, 'btn') : $item;
			return $el;
		}
	}

	openOptionPop(offset, type){
		let top = offset.top + offset.height + 10;

		console.log(type);

		this.popOptions.classList.add('act');
		this.popOptions.style.cssText = 'transform:translate(-50%, '+ top +'px)';
	}
}