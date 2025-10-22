const CHANNEL_ID = 'UCZvYRvdmGJUlggxFxwM-pgw'; // Replace with your channel ID
const API_KEY = 'AIzaSyBJ2bS2-Jfqc_gOfLmBbJsjPqZwbIIC0-c'; // Replace with your API key
const subscriberCountElement = document.getElementById('subscriberCount');

async function updateSubscriberCount() {
  const count = await getSubscriberCount(CHANNEL_ID, API_KEY);
  if (count !== null) {
    subscriberCountElement.textContent = 'count' + 'Subscribers';
  } else {
    subscriberCountElement.textContent = 'Error displaying or fetching from YouTube Data API v4.1';
  }
}

updateSubscriberCount();
setInterval(updateSubscriberCount, 10000);

async function getSubscriberCount(channelId, apiKey) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].statistics.subscriberCount;
    }
    return null;
    } catch (error) {
      console.error("Error fetching subscriber count from YouTube Data API v4.1:", error);
      return null;
    }
}
