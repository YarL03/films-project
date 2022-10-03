import React, { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from "@/components/layout/Layout"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

const MainProvider: FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                {children}
            </Layout>
        </QueryClientProvider>
        
    )
}

export default MainProvider