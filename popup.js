document.addEventListener('DOMContentLoaded', function() {
    var newGroupButton = document.getElementById('new_group');
	newGroupButton.addEventListener('click', function() {
		var new_group_name = document.getElementById('new_group_name').value;
		if(new_group_name == '')
			new_group_name = new Date().toLocaleString();
		alert(new_group_name);
	},false);
},false);

function reload(){   
    chrome.storage.local.get(null, function(items) {
        var data = document.getElementById('data');
        var keys = Object.keys(items);
        var html = '';
        for (var i = 0; i < keys.length; i++){
            html += '<div id="' + keys[i] + '" class="group">';
            html += '<a href="javascript:openTabs('+ keys[i] + ');">' + keys[i] + '</a>';
            html += '<button title="Удалить сессию" >X</button>';
            html += '</div>';
        }
        console.log('why:' + html);
        data.innerHTML = html;
    });             
}

reload();

function openTabs(key){
    alert(key);
}