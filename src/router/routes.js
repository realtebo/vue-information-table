const routes = [
  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue")
      },
      {
        path: "/auth",
        component: () => import("pages/PageAuth.vue")
      },
      {
        path: "/publishers",
        component: () => import("pages/PagePublishers.vue")
      },
      {
        path: "/meetings-for-field-service",
        component: () => import("pages/PageMeetingsForFieldService.vue")
      },
      {
        path: "/public-meeting-chairmans",
        component: () => import("pages/PagePublicMeetingChairmans.vue")
      },
      {
        path: "/public-meeting-readers",
        component: () => import("pages/PagePublicMeetingReaders.vue")
      },
      {
        path: "/sound-department",
        component: () => import("pages/PageSoundDepartment.vue")
      },
      {
        path: "/congregation-settings",
        component: () => import("pages/PageCongregationSettings.vue")
      },
      {
        path: "/microphone-handlers",
        component: () => import("pages/PageMicrophoneHandlers.vue")
      },
      {
        path: "/attendants",
        component: () => import("pages/PageAttendants.vue")
      },
      {
        path: "/christian-life-chairmans",
        component: () => import("pages/PageChristianLifeChairmans.vue")
      },
      {
        path: "/book-readers",
        component: () => import("pages/PageBookReaders.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
