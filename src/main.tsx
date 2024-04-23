import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { NextUIProvider } from "@nextui-org/react"
import { RouterProvider } from "react-router-dom" // імпорт BrowserRouter
import { ThemeProvider } from "./components/theme-provider"
import { routerPath } from "./router"
import { AuthGuard } from "./features/user/AuthGuard"

const container = document.getElementById("root")

const router = routerPath

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
            <ThemeProvider>
              <AuthGuard>
                <RouterProvider router={router}/>
              </AuthGuard>
            </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
