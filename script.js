let salesData = [];
const fileInput = document.getElementById('csvfile');
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; 
    if (file) {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                salesData = results.data;
                document.getElementById('summary').style.display = 'block';
                calculateSummary();
            },
            error: function(error) {
                alert('Error reading file: ' + error.message);
            }
        });
    }
});
function calculateSummary() {
    let totalRevenue = 0; 
    salesData.forEach(row => {
        if (row.Price && row.Quantity) {
            totalRevenue += row.Price * row.Quantity;
        }
    });
    let totalOrders = salesData.length;
    let productRevenue = {};
    salesData.forEach(row => {
        if (row.Product && row.Price && row.Quantity) {
            let revenue = row.Price * row.Quantity;
            if (productRevenue[row.Product]) {
                productRevenue[row.Product] += revenue;
            } else {
                productRevenue[row.Product] = revenue;
            }
        }
    });
    let bestProduct = '';
    let maxProductRevenue = 0;    
    for (let product in productRevenue) {
        if (productRevenue[product] > maxProductRevenue) {
            maxProductRevenue = productRevenue[product];
            bestProduct = product;
        }
    }
    let cityRevenue = {};
    salesData.forEach(row => {
        if (row.City && row.Price && row.Quantity) {
            let revenue = row.Price * row.Quantity;
            if (cityRevenue[row.City]) {
                cityRevenue[row.City] += revenue;
            } else {
                cityRevenue[row.City] = revenue;
            }
        }
    });
    let topCity = '';
    let maxCityRevenue = 0;
    for (let city in cityRevenue) {
        if (cityRevenue[city] > maxCityRevenue) {
            maxCityRevenue = cityRevenue[city];
            topCity = city;
        }
    }
    document.getElementById('totalRevenue').textContent = '₹' + totalRevenue.toLocaleString();
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('bestProduct').textContent = bestProduct;
    document.getElementById('topCity').textContent = topCity;
}