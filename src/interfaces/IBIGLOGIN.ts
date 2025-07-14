export interface IBigLogin{
    user: IBigUser;
    expires: string;
    accessToken: string;
    error: null;
}

export interface IBigUser{
    name: string;
    email: string;
}

export interface IBigClockOut{
    projects: IBigProjects[];
    work_location: number;
}

export interface IBigProjects{
    key: number;
    project_id: number;
    regular_hours: number;
    overtime_hours: number;
    notes: string;
}
// {"projects":[{"key":1,"project_id":54,"regular_hours":8,"overtime_hours":0,"notes":"-"}],"work_location":1}
//  "user": {
//         "name": "ANSELMUS RAYNARD HALIM",
//         "email": "anselmus.halim@binus.edu"
//     },
//     "expires": "2025-08-13T12:53:37.811Z",
//     "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0bkQzdkNjbjE3WUxldnpIWGpOamNUTEljY2hvWXM3dUdRc2pnRWRYTURzIn0.eyJleHAiOjE3NTI0OTc5MTcsImlhdCI6MTc1MjQ5NzYxNywiYXV0aF90aW1lIjoxNzUyNDk2NjMzLCJqdGkiOiJvbnJ0cnQ6YTAwMDE3YjUtOWJiZS00N2I4LTk5ZjAtNThmZmZjNTA4ODQ2IiwiaXNzIjoiaHR0cHM6Ly9iaWd0ZWNoLmNvLmlkL2JpZ2F1dGgvcmVhbG1zL0JJRyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlZjM0Zjg4My1mMjNjLTQ1ZDctYjJiMS02ZTZlYTEzMjczYzciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiaWctcmVzb3VyY2VzIiwic2lkIjoiMzllNjkzN2YtNjEyZi00ODMwLTlkZjUtOWE5ZmRjMzc1YzBmIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0IiwiaHR0cHM6Ly9iaWd0ZWNoLmNvLmlkIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1iaWciXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiQU5TRUxNVVMgUkFZTkFSRCBIQUxJTSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFuc2VsbXVzLmhhbGltIiwiZ2l2ZW5fbmFtZSI6IkFOU0VMTVVTIiwiZmFtaWx5X25hbWUiOiJSQVlOQVJEIEhBTElNIiwiZW1haWwiOiJhbnNlbG11cy5oYWxpbUBiaW51cy5lZHUifQ.IbEjAkyTrv8tl2GOl11RnUGSsznFeLwNFIoQYGdGKw4JrKif-jbSoLKuK1zsCUhddnwm9cwORvVxEN8TvIWdV7GSVp0r63TDeUuyuT5pKXMVJ-SI5UlkSizoprjD9PGxuns6glLzp0YKLnDPED2ULnUUMPrqo3NVHV_h8xPQ9yZTh_EbPEtqGqFN8Al0HnWYKRWn-U4wSgUPxnWZ1OqNwnuUuGsouRe7Fd1yotxC1dfLtP0FPZ-_G6D09dlLtgeCE1eeX-j6x1czfR9rwHlUzPJoj35vd_-TsZ1EVOeozE8z_mQgfaZa7mSbv-3jZfsErCJx-Xa0AU0dKqRi_JZYsw",
//     "error": null