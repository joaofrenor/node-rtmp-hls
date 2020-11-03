module.exports = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: false,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: "*",
    mediaroot: process.env.MEDIA_ROOT || "./media",
  },
  trans: {
    ffmpeg: process.env.FFMPEG_PATH || "/usr/local/bin/ffmpeg",
    tasks: [
      {
        app: "stream",
        hls: true,
        hlsFlags: "[hls_time=6:hls_list_size=3:hls_flags=delete_segments]",
      },
    ],
  },
  // fission: {
  //   ffmpeg: process.env.FFMPEG_PATH || "/usr/local/bin/ffmpeg",
  //   tasks: [
  //     {
  //       rule: "stream/*",
  //       model: [
  //         {
  //           ab: "192k",
  //           vb: "3000k",
  //           vs: "1902x1080",
  //           vf: "30",
  //         },
  //         {
  //           ab: "128k",
  //           vb: "1500k",
  //           vs: "1280x720",
  //           vf: "30",
  //         },
  //         {
  //           ab: "96k",
  //           vb: "1000k",
  //           vs: "854x480",
  //           vf: "30",
  //         },
  //         {
  //           ab: "96k",
  //           vb: "600k",
  //           vs: "640x360",
  //           vf: "30",
  //         },
  //       ],
  //     },
  //   ],
  // },
  relay: {
    ffmpeg: process.env.FFMPEG_PATH || "/usr/bin/ffmpeg",
    tasks: [
      {
        app: "stream",
        mode: "push",
        edge: "rtmp://127.0.0.1/hls_1080p",
      },
      {
        app: "stream",
        mode: "push",
        edge: "rtmp://127.0.0.1/hls_720p",
      },
      {
        app: "stream",
        mode: "push",
        edge: "rtmp://127.0.0.1/hls_480p",
      },
      {
        app: "stream",
        mode: "push",
        edge: "rtmp://127.0.0.1/hls_360p",
      },
    ],
  },
  trans: {
    ffmpeg: "/usr/local/bin/ffmpeg",
    tasks: [
      {
        app: "hls_1080p",
        hls: true,
        ac: "aac",
        acParam: ["-b:a", "192k", "-ar", 48000],
        vcParam: [],
        hlsFlags: "[hls_time=3:hls_list_size=10:hls_flags=delete_segments]",
      },
      {
        app: "hls_720p",
        hls: true,
        ac: "aac",
        acParam: ["-b:a", "128k", "-ar", 48000],
        vcParam: [],
        hlsFlags: "[hls_time=3:hls_list_size=10:hls_flags=delete_segments]",
      },
      {
        app: "hls_480p",
        hls: true,
        ac: "aac",
        acParam: ["-b:a", "128k", "-ar", 48000],
        vcParams: [],
        hlsFlags: "[hls_time=3:hls_list_size=10:hls_flags=delete_segments]",
      },
      {
        app: "hls_360p",
        hls: true,
        ac: "aac",
        acParam: ["-b:a", "96k", "-ar", 48000],
        vcParams: [],
        hlsFlags: "[hls_time=3:hls_list_size=10:hls_flags=delete_segments]",
      },
    ],
  },
};
