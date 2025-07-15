from django.shortcuts import render
from django.shortcuts import render
from .forms import ContactForm

def home(request):
    return render(request, 'home.html')
def about(request):
    return render(request, 'about.html')
def tech (request):
    return render(request, 'tech.html')
def certificates(request):
    return render(request, 'certificates.html')
def blog (request):
    return render(request, 'blog.html')

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'contact.html', {
                'form': ContactForm(),
                'success': True
            })
    else:
        form = ContactForm()
    
    return render(request, 'contact.html', {'form': form})

