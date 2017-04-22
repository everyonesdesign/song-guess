A simple game. The goal is to remember some songs which contain a certain word.

Musixmatch API is used as a backend. You'll need to write a simple proxy to their API, e.g. in PHP:

```
<?php
    $url = 'https://api.musixmatch.com/ws/1.1/track.search';
    $params = '?f_lyrics_language=en&format=json&s_track_rating=desc';
    $query = '&q_lyrics=' . $_GET['word'];
    $api_key = '&apikey=YOUR-KEY-GOES-HERE';
    $json = file_get_contents($url . $params . $query . $api_key);
    $obj = json_decode($json);
    $tracks = $obj->message->body->track_list;
    header('Access-Control-Allow-Origin: *');
    echo json_encode($tracks);
?>
```

You should also create a directory `dict` and place here `index.json` file with your dictionary.
Its format is a simple list of words, e.g. `["cat", "bat", "rat"]`.
