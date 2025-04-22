export const generateSeatMap = (cinemaId) => {
  // Different configurations for each cinema with increased rows
  const cinemaConfigs = {
    ruby: { rows: 10, cols: 12, premiumRows: [8, 9] }, // Increased to 10 rows (A-J)
    sapphire: { rows: 10, cols: 8, premiumRows: [8, 9] }, // Already 10 rows
    emerald: { rows: 10, cols: 10, premiumRows: [8, 9] }, // Increased to 10 rows
  };

  const config = cinemaConfigs[cinemaId] || cinemaConfigs.ruby;
  const seatMap = [];

  for (let i = 0; i < config.rows; i++) {
    const row = [];
    for (let j = 0; j < config.cols; j++) {
      // Randomly mark some seats as booked (15% chance instead of 20%)
      const isBooked = Math.random() < 0.15;
      
      // Determine seat type and price based on row position
      let seatType;
      let price;
      
      // Premium seats (rows I-J)
      if (i >= 8) {
        seatType = 'Premium';
        price = 500;
      }
      // Standard seats (rows E-H)
      else if (i >= 4 && i < 8) {
        seatType = 'Standard';
        price = 350;
      }
      // Basic seats (rows A-D)
      else {
        seatType = 'Basic';
        price = 200;
      }

      // Add premium variations to the layout
      if (cinemaId === 'ruby' && (j === 0 || j === config.cols - 1)) {
        // Ruby cinema has premium corner seats
        if (i >= 4) { // Only make corners premium from row E onwards
          seatType = 'Premium';
          price = 500;
        }
      } else if (cinemaId === 'sapphire' && j >= Math.floor(config.cols / 2) - 1 && j <= Math.floor(config.cols / 2)) {
        // Sapphire has a premium middle column
        if (i >= 4) { // Only make middle premium from row E onwards
          price += 50;
        }
      }

      row.push({ 
        row: i + 1, 
        col: j + 1, 
        booked: isBooked,
        type: seatType,
        price: price,
        isAisle: (cinemaId === 'emerald' && j === Math.floor(config.cols / 2) - 1)
      });
    }
    seatMap.push(row);
  }
  return seatMap;
};