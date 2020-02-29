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
        path: "/congregation-settings",
        component: () => import("pages/PageCongregationSettings.vue")
      },
      {
        path: "/congregation-settings/invitation",
        component: () => import("pages/settings/PageInvitation.vue")
      },
      {
        path: "/meetings-for-field-service",
        component: () =>
          import("pages/meetings/PageMeetingsForFieldService.vue")
      },
      {
        path: "/public-meeting-chairmans",
        component: () => import("pages/meetings/PagePublicMeetingChairmans.vue")
      },
      {
        path: "/public-meeting-readers",
        component: () => import("pages/meetings/PagePublicMeetingReaders.vue")
      },
      {
        path: "/sound-department",
        component: () => import("pages/meetings/PageSoundDepartment.vue")
      },
      {
        path: "/microphone-handlers",
        component: () => import("pages/meetings/PageMicrophoneHandlers.vue")
      },
      {
        path: "/attendants",
        component: () => import("pages/meetings/PageAttendants.vue")
      },
      {
        path: "/christian-life-chairmans",
        component: () => import("pages/meetings/PageChristianLifeChairmans.vue")
      },
      {
        path: "/book-readers",
        component: () => import("pages/meetings/PageBookReaders.vue")
      },
      {
        path: "/christian-life-prayers",
        component: () => import("pages/meetings/PageChristianLifePrayers.vue")
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
