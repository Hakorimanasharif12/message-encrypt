import WhatsAppEncryption from "@/components/WhatsAppEncryption"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">WhatsApp Encryption</h1>
      <div className="max-w-md mx-auto mb-8 text-sm">
        <h2 className="font-semibold mb-2">How to use:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>To encrypt: Enter your message, set the shift value, and click &quot;Encrypt&quot;.</li>
          <li>To decrypt: Paste the encrypted message, set the same shift value, and click &quot;Decrypt&quot;.</li>
          <li>Use the &quot;Share&quot; button to easily send the encrypted message via WhatsApp.</li>
          <li>Always use the same shift value for encrypting and decrypting!</li>
          <li>For more webdevelopment click the Whastapp btn or contact me 0798388890</li>
        </ol>
      </div>
      <WhatsAppEncryption />
    </main>
  )
}

