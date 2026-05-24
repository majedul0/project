import { useEffect, useMemo, useState } from 'react'
import { fetchChatHistory } from '../../services/api'
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import './ChatHistory.css'

const formatDate = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return date.toLocaleString()
}

const ChatHistory = () => {
  const [history, setHistory] = useState([])
  const [limit, setLimit] = useState(40)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const uniqueSessions = useMemo(() => {
    const sessions = new Set(history.map((item) => item.sessionId).filter(Boolean))
    return sessions.size
  }, [history])

  const loadHistory = async (selectedLimit) => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchChatHistory({ limit: selectedLimit })
      setHistory(Array.isArray(data.history) ? data.history : [])
    } catch (loadError) {
      setError(loadError.message || 'Failed to load chat history')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadHistory(limit)
  }, [limit])

  return (
    <AdminLayout>
      <main className="chat-history-page">
        <section className="chat-history-header">
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Agent X Chat History</h1>
            <p>Recent conversation summaries from MongoDB to understand user intents.</p>
          </div>
        </section>

        <section className="chat-history-stats" aria-label="Chat summary stats">
          <article>
            <h2>Total Rows</h2>
            <p>{history.length}</p>
          </article>
          <article>
            <h2>Unique Sessions</h2>
            <p>{uniqueSessions}</p>
          </article>
          <article>
            <h2>Limit</h2>
            <select value={limit} onChange={(event) => setLimit(Number(event.target.value))}>
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={80}>80</option>
            <option value={120}>120</option>
          </select>
        </article>
      </section>

      <section className="chat-history-table-wrap" aria-label="Recent chat history">
        {isLoading ? <p className="chat-history-loading">Loading chat history...</p> : null}
        {error ? <p className="chat-history-error">{error}</p> : null}

        {!isLoading && !error ? (
          <table className="chat-history-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Session</th>
                <th>Main Concept</th>
                <th>User Prompt</th>
                <th>Assistant Summary</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.createdAt)}</td>
                  <td className="chat-history-mono">{item.sessionId}</td>
                  <td>{item.mainConcept}</td>
                  <td>{item.userMessage}</td>
                  <td>{item.assistantSummary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
        </section>
      </main>
    </AdminLayout>
  )
}

export default ChatHistory
