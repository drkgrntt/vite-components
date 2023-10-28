export default {
  build: {
    lib: {
      entry: "src/main.ts", // Entry point of your library
      name: "DrkComponents", // The name of the library
    },
    rollupOptions: {
      output: {
        dir: "dist", // The name of the output file
      },
    },
  },
};
