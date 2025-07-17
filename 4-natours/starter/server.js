import mongoose from 'mongoose';
import { app } from './app.js';
import { Tour } from './db/schema.js';




const port = process.env.PORT || 3000;
const DB = process.env.MONGO_URL_LOCAL; // Validate this exists!

// Validate critical environment variables early
if (!DB) {
  throw new Error('MONGO_URL_LOCAL environment variable is not defined!');
}

const sampleTour = new Tour({
  name: 'Sample Tour 22',
  rating: 4.5,
  price: 100,
});
sampleTour.save()
.then((tour) => {
  console.log('Sample tour created', tour);
})
.catch((error) => {
  console.error('Failed to create sample tour:', error);
});

// Reference to the HTTP server for graceful shutdown
// eslint-disable-next-line unicorn/no-null
let server = null

// Graceful shutdown handler
const gracefulShutdown = async (signal) => {
  console.log(`🛑 ${signal} received. Closing server gracefully...`);

  try {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log('✅ Express server closed');
    }

    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed');
    }

    console.log('🏁 Graceful shutdown complete');
  } catch (error) {
    console.error('❌ Graceful shutdown failed:', error);
    throw error; // Propagate error to crash the process
  }
};

// Setup signal handlers
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    gracefulShutdown(signal)
      .catch((error) => {
        console.error('💥 Forcing shutdown due to error:', error);
        throw error; // Crash the process
      });
  });
}

// Global error safety nets
process.on('uncaughtException', (error) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...', error);
  throw error; // Crash the process
});

process.on('unhandledRejection', (error) => {
  console.error('🔥 UNHANDLED REJECTION! Shutting down...', error);
  throw error; // Crash the process
});

// Main application starter
const start = async () => {
  try {
    const conn = await mongoose.connect(DB, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    server = app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error('❌ Fatal startup error:', error);
    throw error; // Propagate error to be caught by safety nets
  }
};

// Create a sample tour



// Start the application
await start();
