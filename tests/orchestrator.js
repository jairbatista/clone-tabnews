import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
    });

    async function fetchStatusPage() {
      const response = await fetch(
        `http://localhost:${process.env.APP_PORT}/api/v1/status`,
      );
      const responseBody = await response.json();
    }
  }
}

export default { waitForAllServices };
