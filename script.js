$(document).ready(function() {
    // Load data from local storage if available
    let data = localStorage.getItem('priceData');
    if (data) {
      $('#price-table-body').html(data);
    }
  
    // Add row
    $('#add-row-btn').click(function() {
      $('#price-table-body').append(`
        <tr>
          <td class="product-name" contenteditable="true"></td>
          <td class="city-price" contenteditable="true"></td>
          <td class="city-price" contenteditable="true"></td>
          <td class="city-price" contenteditable="true"></td>
          <td class="city-price" contenteditable="true"></td>
          <td class="city-price" contenteditable="true"></td>
          <td class="city-price" contenteditable="true"></td>
          <td><button type="button" class="refresh-btn"><i class="fas fa-sync-alt"></i></button></td> <!-- Refresh button with icon -->
          <td><button type="button" class="delete-btn"><i class="fas fa-trash-alt"></i></button></td> <!-- Delete button with icon -->
        </tr>
      `);
    });
  
    // Save data to local storage
    setInterval(function() {
      let tableData = $('#price-table-body').html();
      localStorage.setItem('priceData', tableData);
    }, 1000);

    function parseNumber(str) {
        if (!str) return 0;
        if (str.toLowerCase().endsWith('k')) {
            return parseFloat(str.slice(0, -1)) * 1000;
        } else if (str.toLowerCase().endsWith('m')) {
            return parseFloat(str.slice(0, -1)) * 1000000;
        } else {
            return parseFloat(str);
        }
    }
  
    function highlightMaxMinPrices(row) {
        row.find('td').removeClass('max-price min-price');
        let prices = row.find('.city-price').map(function() {
          let price = $(this).text().trim();
          return price ? parseNumber(price) : null; // Use parseNumber function to convert to number
        }).get();
        let maxPrice = Math.max(...prices.filter(price => price !== null));
        let minPrice = Math.min(...prices.filter(price => price !== null));
        row.find('.city-price').each(function(index) {
          let price = parseNumber($(this).text()) || 0; // Use parseNumber function
          if (price === maxPrice && price !== null) {
            $(this).addClass('max-price');
          }
          if (price === minPrice && price !== null) {
            $(this).addClass('min-price');
          }
        });
      }
  
    // Highlight max and min prices on input
    $('#price-table-body').on('input', 'tr', function() {
      highlightMaxMinPrices($(this));
    });
  
    // Refresh button functionality
    $('#price-table-body').on('click', '.refresh-btn', function() {
      let row = $(this).closest('tr');
      row.find('.city-price').text('');
      highlightMaxMinPrices(row);
    });

    // Delete button functionality
    $('#price-table-body').on('click', '.delete-btn', function() {
        $(this).closest('tr').remove();
    });


  });
  