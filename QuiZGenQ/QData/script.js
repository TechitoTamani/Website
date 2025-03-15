// Function to toggle the sidebar open/close
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('main-content');
    var toggleButton = document.querySelector('.toggle-btn');
    
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('expanded');
    
    // Change the arrow direction based on the sidebar state
    if (sidebar.classList.contains('open')) {
      toggleButton.innerHTML = '>'; // Left arrow when sidebar is open
    } else {
      toggleButton.innerHTML = '<'; // Right arrow when sidebar is closed
    }
  }
  