document.addEventListener('DOMContentLoaded', function() {
    var newGroupButton = document.getElementById('new_group');
    newGroupButton.addEventListener('click', function() {
        var key = document.getElementById('new_group_name').value == '' ? new Date().toLocaleString() : document.getElementById('new_group_name').value;
		var value = [];
        chrome.tabs.getAllInWindow(null, function(tabs){
            for (var i = 0; i < tabs.length; i++) 
                value.push(tabs[i].url);
            
        console.log('key:'+key);
        var new_group = {};
        new_group[key] = value;
        chrome.storage.local.set(new_group);
        console.log(new_group);  
        reload();
    });        
    },false);
},false);

function deleteGroup(){
    console.log('test del'+this.id.slice(1));
    chrome.storage.local.remove(this.id.slice(1));
    reload();
}

function openGroup(){
    console.log('test open'+this.id.slice(1));
    var profile = this.id.slice(1);
    chrome.storage.local.get(profile, function(item){    
    tabURLs = [];
     chrome.windows.create({url:item[profile]}, function(window){
    });
   });
}

function reload(){   
    chrome.storage.local.get(null, function(items) {
        var data = document.getElementById('data');
        var keys = Object.keys(items);
        var html = '';
        for (var i = 0; i < keys.length; i++){      
            html += '<div class="group">';
            html += '<a href="" title="Открыть сессию" id="o' + keys[i] + '">' + keys[i] + '</a>';
            html += '<button id="d' + keys[i] + '" title="Удалить сессию" >X</button>';
            html += '</div>';
        }
        console.log('why:' + html);
        data.innerHTML = html;
        
        for (var i = 0; i < keys.length; i++){                            
            document.getElementById('o'+keys[i]).addEventListener("click", openGroup);
            document.getElementById('d'+keys[i]).addEventListener("click", deleteGroup);           
        }
    });             
}

reload();