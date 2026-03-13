import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Button} from '~/components/ui/button';
import {Input} from '~/components/ui/input';
import {Textarea} from '~/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import {useFetcher} from 'react-router';
import {useEffect} from 'react';
import {Mail, Phone, Clock} from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().optional(),
  comment: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactFormSection() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';
  const isSuccess = fetcher.data?.success;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      comment: '',
    },
  });

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  const onSubmit = (data: ContactFormValues) => {
    fetcher.submit(data, {
      method: 'post',
      action: '/?index',
    });
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in touch
            </h2>

            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Have a question, partnership idea, or need support? Send us a
              message and our team will get back to you within 24 hours.
            </p>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 text-center">
                Message sent! We'll get back to you shortly.
              </p>
            </div>
          )}

          {/* Form */}
          <Form {...form}>
            <fetcher.Form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Your name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jane Smith"
                          autoComplete="name"
                          className="h-12 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jane@company.com"
                          autoComplete="email"
                          className="h-12 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Phone (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+254 712 345 678"
                          autoComplete="tel"
                          className="h-12 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>How can we help?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a bit about what you need..."
                          className="min-h-32 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending message...' : 'Send message'}
              </Button>

              {/* Privacy note */}
              <p className="text-xs text-muted-foreground text-center mt-3">
                We respect your privacy. Your information will never be shared.
              </p>
            </fetcher.Form>
          </Form>

          {/* Contact Info */}
          <div className="mt-10 pt-8 border-t border-border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                  <Mail className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-foreground">Email us</p>
                <p className="text-sm text-muted-foreground">
                  support@terravow.com
                </p>
              </div>

              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                  <Phone className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-foreground">Call us</p>
                <p className="text-sm text-muted-foreground">
                  +1 (800) 123-4567
                </p>
              </div>

              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Typical response
                </p>
                <p className="text-sm text-muted-foreground">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
