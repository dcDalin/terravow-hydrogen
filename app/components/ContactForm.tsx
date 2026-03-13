import {useState} from 'react';
import {Form, useActionData, useNavigation} from 'react-router';
import {motion} from 'framer-motion';
import {Mail, Phone, MapPin, Send, CheckCircle2} from 'lucide-react';
import {Button} from './ui/button';
import {Input} from './ui/input';
import {Card, CardContent, CardHeader, CardTitle} from './ui/card';

export function ContactForm() {
  const actionData = useActionData<{success?: boolean; error?: string}>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about our products? We're here to help you on your
          wellness journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{opacity: 0, x: -20}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.5, delay: 0.1}}
        >
          {/* Contact Cards */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a
                    href="mailto:support@terravow.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    support@terravow.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <a
                    href="tel:+1-800-TERRAVOW"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    1-800-TERRAVOW
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mon-Fri 9am-5pm EST
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Location
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Based in the USA
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="text-base">Quick Response</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We typically respond within 24 hours. For urgent matters, please
                call our support line.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="lg:col-span-2"
          initial={{opacity: 0, x: 20}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.5, delay: 0.2}}
        >
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {actionData?.success ? (
                <motion.div
                  initial={{opacity: 0, scale: 0.9}}
                  animate={{opacity: 1, scale: 1}}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-green-600 dark:text-green-400" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <Form method="post" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground"
                      >
                        Name *
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email *
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-foreground"
                    >
                      Phone
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="(555) 123-4567"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-foreground"
                    >
                      Subject *
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us more about your inquiry..."
                      required
                      disabled={isSubmitting}
                      className="w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                  </div>

                  {/* Error Message */}
                  {actionData?.error && (
                    <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
                      <p className="text-sm text-destructive">
                        {actionData.error}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="mr-2" size={18} />
                        Send Message
                      </>
                    )}
                  </Button>
                </Form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* FAQ Callout */}
      <motion.div
        className="mt-16 text-center"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 0.4}}
      >
        <Card className="max-w-3xl mx-auto bg-muted">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Looking for Quick Answers?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Check out our product pages for detailed FAQs about each supplement.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
