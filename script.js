var note = null;
var count = 0;
$(document).ready(function() {
    retrieve_saved_notes();
    //localStorage.clear();
    $('#save').click(function() {
        var title = $('#text-title').val();
        var info = $('#text-field').val();    
        if(note) {
          var date = new Date();
          $('#' + note)[0].children[0].innerHTML = title;
          $('#' + note)[0].children[1].innerHTML = date.toLocaleString("en-US");
          $('#' + note)[0].children[2].innerHTML = info;
          if(check_storage() == true) {
            var edited_note = note.replace( /^\D+/g, '');
            var edited_note_num = parseInt(edited_note);
            localStorage.setItem('date' + edited_note_num, date);    
            localStorage.setItem('title' + edited_note_num, title);
            localStorage.setItem('info' + edited_note_num, info);   
          }  
        } else {
          var date = new Date();
          if(check_storage() == true) { 
            if(localStorage.getItem('numOfNotes') != null) {
              var num_of_notes = parseInt(localStorage.getItem('numOfNotes'), 10);
              count = num_of_notes;
            } 
            localStorage.setItem('numOfNotes', count + 1);
            localStorage.setItem('date' + (count + 1), date);       
            localStorage.setItem('title' + (count + 1), title);
            localStorage.setItem('info' + (count + 1), info); 
          }    
          var note_num = count + 1;
          $('#listed-notes').append('<div id="note' + note_num + '"><div class="saved-title">' + title + '</div> <div class="saved-date">' + date.toLocaleString("en-US") + '</div> <div class="saved-text">' + info + '</div> </div>');
          count++;  
        }   
    });

    $('#delete-note').click(function(){
        if (note) {
          $('#' + note)[0].remove();
          var edited_note = note.replace( /^\D+/g, '');
          var edited_note_num = parseInt(edited_note);
          if(check_storage() == true) {
            localStorage.removeItem('title' + edited_note_num);   
            localStorage.removeItem('date' + edited_note_num);
            localStorage.removeItem('info' + edited_note_num);
            localStorage.removeItem('color' + edited_note_num);
            var index = edited_note_num + 1;
            while(localStorage.getItem('date' + index) != null) {
              var title = localStorage.getItem('title' + index);
              var date = localStorage.getItem('date' + index);
              var info = localStorage.getItem('info' + index);
              var color = localStorage.getItem('color' + index);
              $('#note' + index)[0].id = 'note' + (index - 1);
              localStorage.setItem('title' + (index - 1), title);
              localStorage.setItem('date' + (index - 1), date);
              localStorage.setItem('info' + (index - 1), info);
              localStorage.setItem('color' + (index - 1), color);
              index++;
            }
            var remove_note = edited_note_num + 1;
            if(localStorage.getItem('date' + remove_note) != null) {
              localStorage.removeItem('title' + (index - 1));
              localStorage.removeItem('date' + (index - 1));
              localStorage.removeItem('info' + (index - 1));
              localStorage.removeItem('color' + (index - 1));
            }
            count--;
            localStorage.setItem('numOfNotes', count);
          }   
          note = null;
        } else {
          alert('Please choose a note to delete!');
        }  
    });
    
    $('#new-note').click(function(){   
        note = null;     
        $('#text-title').val('');
        $('#text-field').val('');
    });
    
    $('#edit-note').click(function(){
      if (!note) {
        alert('Please choose a note to edit!');
      }
      $('#text-title').val($('#' + note)[0].children[0].innerHTML.replace(' &#10004', ""));
      $('#text-field').val($('#' + note)[0].children[2].innerHTML);
    });

    $('.color-box').click(function(){
      if (!note) {
        alert('Please select a note');
      } else {
        var edited_note = note.replace( /^\D+/g, '');
        $('#' + note).css('background-color', $(this).css('background-color'));
        localStorage.setItem('color' + edited_note, $(this).css('background-color'));
      }
    });

    $('#default-color').click(function() {
      if (!note) {
        alert('Please select a note first');
      } else {
        var edited_note = note.replace( /^\D+/g, '');
        $('#' + note).css('background-color', '#B6B6B6');
        localStorage.setItem('color' + edited_note, '#B6B6B6');
      }
    });

    $('#listed-notes').click(function(e){
      var note_id = e.target.parentElement.id;
      note = note_id;
    });
})

function check_storage() {
  if(typeof(Storage) !== "undefined") {
    return true;
  } else {
    alert("Web storage is unsupported! Notes will not be saved after refresh!");
    return false;
  }
}
  
function retrieve_saved_notes() {
  if(check_storage() == true) {
    var index = 1;
    if(localStorage.getItem('numOfNotes') != null) {
      var num_of_notes = parseInt(localStorage.getItem('numOfNotes'), 10);
      count = num_of_notes;
    } 
    while(localStorage.getItem('date' + index) != null) {
      var title = localStorage.getItem('title' + index);
      var date = localStorage.getItem('date' + index);
      var info = localStorage.getItem('info' + index); 
      var color = localStorage.getItem('color' + index);
      var note_num = index;
      $('#listed-notes').append('<div id="note' + note_num + '"><div class="saved-title">' + title + '</div> <div class="saved-date">' + date.toLocaleString("en-US") + '</div> <div class="saved-text">' + info + '</div> </div>'); 
      $('#note' + note_num).css('background-color', color);
      index++;
    }
  }
}