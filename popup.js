document.addEventListener('DOMContentLoaded', function() {
    /**
    * Добавление новой группы вкладок
    */
    document.getElementById('new_group').addEventListener('click', function() {
        /**
        * Id группы вкладок
        *
        * @var string $key
        */
        var key = document.getElementById('new_group_name').value == '' ? new Date().toLocaleString() : document.getElementById('new_group_name').value;
        /**
        * URL адреса группы вкладок
        *
        * @var object $value
        */
		var value = [];
        chrome.tabs.getAllInWindow(null, function(tabs){
            for (var i = 0; i < tabs.length; i++) 
                value.push(tabs[i].url);
            
        console.log('key:'+key);
        /**
        * Группа вкладок
        *
        * @var object $new_group
        */
        var new_group = {};
        new_group[key] = value;
        chrome.storage.local.set(new_group);
        console.log(new_group);  
        reload();
    });        
    },false);
},false);

/**
 *Удаляет текущую группу вкладок из хранилища
 */
function deleteGroup(){
    console.log('test del'+this.id.slice(1));
    chrome.storage.local.remove(this.id.slice(1));
    reload();
}

/**
 *Открывает текущую группу вкладок в новом окне
 */
function openGroup(){
    console.log('test open'+this.id.slice(1));
    /**
        * Id группы вкладок
        *
        * @var string $key
    */
    var key = this.id.slice(1);
    chrome.storage.local.get(key, function(item){    
        chrome.windows.create({url:item[key]}, function(window){
    });
   });
}

/**
 *Обновляет страницу расширения
 */
function reload(){   
    chrome.storage.local.get(null, function(items) {
        /**
        * Id группы вкладок
        *
        * @var string $key
        */
        var keys = Object.keys(items);
        /**
        * html-код для отображения сохраненных групп 
        *
        * @var string $html
        */
        var html = '';
        for (var i = 0; i < keys.length; i++){      
            html += '<div class="group">';
            html += '<a href="" title="Открыть сессию" id="o' + keys[i] + '">' + keys[i] + '</a>';
            html += '<button id="d' + keys[i] + '" title="Удалить сессию" >X</button>';
            html += '</div>';
        }
        console.log('why:' + html);
        document.getElementById('data').innerHTML = html;
        
        for (var i = 0; i < keys.length; i++){                            
            document.getElementById('o'+keys[i]).addEventListener("click", openGroup);
            document.getElementById('d'+keys[i]).addEventListener("click", deleteGroup);           
        }
    });             
}

reload();