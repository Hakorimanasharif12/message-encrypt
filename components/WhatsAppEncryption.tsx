"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertCircle, Copy, Share2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const caesarCipher = (str: string, shift: number, decrypt = false): string => {
  return str
    .split("")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0)
        const shiftAmount = (decrypt ? -shift : shift) % 26
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shiftAmount + 26) % 26) + 65)
        } else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + shiftAmount + 26) % 26) + 97)
        }
      }
      return char
    })
    .join("")
}

export default function WhatsAppEncryption() {
  const [message, setMessage] = useState("")
  const [shift, setShift] = useState(3)
  const [encryptedMessage, setEncryptedMessage] = useState("")
  const [decryptedMessage, setDecryptedMessage] = useState("")
  const [showShift, setShowShift] = useState(false)
  const [error, setError] = useState("")

  const handleEncrypt = () => {
    if (!message) {
      setError("Please enter a message to encrypt.")
      return
    }
    setError("")
    const encrypted = caesarCipher(message, shift)
    setEncryptedMessage(encrypted)
    setDecryptedMessage("")
  }

  const handleDecrypt = () => {
    if (!message) {
      setError("Please enter a message to decrypt.")
      return
    }
    setError("")
    const decrypted = caesarCipher(message, shift, true)
    setDecryptedMessage(decrypted)
    setEncryptedMessage("")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const shareMessage = (text: string) => {
    if (navigator.share) {
      navigator
        .share({
          text: text,
        })
        .catch(console.error)
    } else {
      copyToClipboard(text)
      alert("Message copied to clipboard!")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">WhatsApp Encryption</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="encrypt" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
            <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
          </TabsList>
          <TabsContent value="encrypt" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="encrypt-message">Message to Encrypt</Label>
              <Input
                id="encrypt-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                className="bg-[#E6F3FF] text-gray-800 placeholder-gray-500"
              />
            </div>
            <Button onClick={handleEncrypt} className="w-full bg-[#FF5733] hover:bg-[#E64D2E] text-white">
              Encrypt
            </Button>
            {encryptedMessage && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Encrypted Message:</h3>
                <div className="flex items-center space-x-2">
                  <p className="flex-1 p-2 bg-gray-100 rounded">{encryptedMessage}</p>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(encryptedMessage)}
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => shareMessage(encryptedMessage)}
                    title="Share message"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="decrypt" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="decrypt-message">Message to Decrypt</Label>
              <Input
                id="decrypt-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter encrypted message"
                className="bg-[#E6F3FF] text-gray-800 placeholder-gray-500"
              />
            </div>
            <Button onClick={handleDecrypt} className="w-full bg-[#FF5733] hover:bg-[#E64D2E] text-white">
              Decrypt
            </Button>
            {decryptedMessage && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Decrypted Message:</h3>
                <p className="p-2 bg-gray-100 rounded">{decryptedMessage}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="shift">Shift (Key)</Label>
            <div className="flex items-center space-x-2">
              <Switch id="show-shift" checked={showShift} onCheckedChange={setShowShift} />
              <Label htmlFor="show-shift">Show</Label>
            </div>
          </div>
          <Slider id="shift" value={[shift]} onValueChange={(value) => setShift(value[0])} min={1} max={25} step={1} />
          {showShift && <div className="text-sm text-center">Current shift: {shift}</div>}
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

