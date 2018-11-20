document.addEventListener('DOMContentLoaded', function() {
    var newGroupButton = document.getElementById('new_group');
	newGroupButton.addEventListener('click', function() {
		var new_group_name = document.getElementById('new_group_name').value;
		if(new_group_name == '')
			new_group_name = new Date().toLocaleString();
		alert(new_group_name);
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

